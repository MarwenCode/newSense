import sys
from langchain_chroma import Chroma
from langchain_ollama import ChatOllama, OllamaEmbeddings

def search(vectorstore, query):
    results = vectorstore.similarity_search(query, k=5)
    return results




def generate_answer(llm, query, results):
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

    answer = llm.invoke(prompt)
    return answer.content


def main():
    query = sys.argv[1]

    llm = ChatOllama(model="llama3.2", temperature=0)
    embeddings = OllamaEmbeddings(model="mxbai-embed-large")
    vectorstore = Chroma(
        collection_name="newsense",
        persist_directory="chroma_storage",
        embedding_function=embeddings,
    )

    results = search(vectorstore, query)
    answer = generate_answer(llm, query, results)
    print(answer)


main()