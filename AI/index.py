import sys
from pathlib import Path
from langchain_chroma import Chroma
from langchain_ollama import OllamaEmbeddings
from langchain_core.documents import Document


#define the chunk function
def chunk_text(text: str, chunk_size: int = 1200, overlap: int = 200) -> list[str]:
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


#define the index document function
def index_document(file_path: str) -> None:
    path = Path(file_path)
    text = path.read_text(encoding="utf-8", errors="ignore").strip()

    if not text:
        print("Error: Empty document")
        return

    chunks = chunk_text(text)

    docs = []
    for i, chunk in enumerate(chunks, start=1):
        docs.append(
            Document(
                page_content=chunk,
                metadata={"source": path.name, "chunk": i}
            )
        )

    embeddings = OllamaEmbeddings(model="mxbai-embed-large")
    vectorstore = Chroma(
        collection_name="newsense",
        persist_directory="chroma_storage",
        embedding_function=embeddings,
    )

    vectorstore.add_documents(docs)
    print(f"Indexed {len(docs)} chunks from {path.name}")
    
    
    
    
    
    #define the main function
def main():
    if len(sys.argv) < 2:
        print("Error: No file path provided")
        sys.exit(1)

    file_path = sys.argv[1]
    index_document(file_path)


main()