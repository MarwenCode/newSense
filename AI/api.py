import os
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_groq import ChatGroq
from pathlib import Path
import shutil

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=os.getenv("GROQ_API_KEY"),
    temperature=0
)

vectorstore = Chroma(
    collection_name="newsense",
    persist_directory="chroma_storage",
    embedding_function=embeddings,
)


def chunk_text(text: str, chunk_size: int = 1200, overlap: int = 200):
    chunks = []
    start = 0
    text_len = len(text)
    while start < text_len:
        end = min(start + chunk_size, text_len)
        chunk = text[start:end].strip()
        if chunk:
            chunks.append(chunk)
        if end == text_len:
            break
        start = max(end - overlap, start + 1)
    return chunks


@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    upload_dir = Path("uploads")
    upload_dir.mkdir(exist_ok=True)
    file_path = upload_dir / file.filename

    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    text = file_path.read_text(encoding="utf-8", errors="ignore").strip()
    chunks = chunk_text(text)

    from langchain_core.documents import Document
    docs = [
        Document(page_content=chunk, metadata={"source": file.filename, "chunk": i})
        for i, chunk in enumerate(chunks, start=1)
    ]

    vectorstore.add_documents(docs)
    return {"message": "File indexed successfully!"}


@app.post("/ask")
async def ask(body: dict):
    question = body.get("question", "")
    results = vectorstore.similarity_search(question, k=5)

    context = ""
    for result in results:
        context += result.page_content + "\n\n"

    prompt = f"""You are newSense, a friendly AI document assistant.
If the user is greeting you, respond naturally and friendly.
If the user is asking about the document, use ONLY the context below.
If the answer is not in the context, say "I don't find that information in your document."

Context:
{context}

User message: {question}
Answer:"""

    def stream():
        for chunk in llm.stream(prompt):
            yield chunk.content

    return StreamingResponse(stream(), media_type="text/plain")