import sys
import os
import time
from dotenv import load_dotenv
from langchain_chroma import Chroma
# from langchain_ollama import OllamaEmbeddings
from langchain_groq import ChatGroq
from langchain_huggingface import HuggingFaceEmbeddings

load_dotenv()

def search(vectorstore, query):
    results = vectorstore.similarity_search(query, k=5)
    return results

def generate_answer_stream(llm, query, results):
    context = ""
    for result in results:
        context = context + result.page_content + "\n\n"

    prompt = f"""You are newSense, a friendly AI document assistant.

You can do two things:
1. Have a casual conversation (greetings, questions about yourself)
2. Answer questions based on the document context below

If the user is greeting you or asking casual questions, respond naturally and friendly.
If the user is asking about the document, use ONLY the context below to answer.
If the answer is not in the context, say "I don't find that information in your document."

Context from document:
{context}

User message: {query}

Answer:"""

    for chunk in llm.stream(prompt):
        print(chunk.content, end="", flush=True)

def main():
    query = sys.argv[1]

    llm = ChatGroq(
        model="llama-3.3-70b-versatile",
        api_key=os.getenv("GROQ_API_KEY"),
        temperature=0
    )

    embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    vectorstore = Chroma(
        collection_name="newsense",
        persist_directory="chroma_storage",
        embedding_function=embeddings,
    )

    results = search(vectorstore, query)
    generate_answer_stream(llm, query, results)

main()