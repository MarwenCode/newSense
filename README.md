# newSense 🤖

An AI-powered document assistant that lets users upload their own documents and ask questions about them. Built with React, Node.js, Express, Python, LangChain, ChromaDB and Ollama.

---

## What is newSense?

newSense is a **RAG (Retrieval Augmented Generation)** application. Instead of asking an AI from its general knowledge, newSense searches YOUR uploaded documents first — then generates accurate answers based only on that content.

```
Upload your document
        ↓
Ask any question about it
        ↓
newSense searches your document
        ↓
Gets a precise AI-generated answer
```

---

## Why newSense?

Traditional AI chatbots answer from their training memory and can hallucinate (make things up). newSense solves this by:

- ✅ Only answering from YOUR documents
- ✅ Showing which document the answer came from
- ✅ Running completely locally — your data never leaves your computer
- ✅ No API key required — 100% free to run

---

## Tech Stack

### Frontend
| Tool | Purpose |
|---|---|
| React | User interface |
| Vite | Build tool |
| Axios | HTTP requests to backend |

### Backend
| Tool | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express | API server |
| Multer | File upload handling |
| child_process | Bridge between Node.js and Python |

### AI / Python
| Tool | Purpose |
|---|---|
| Python | AI pipeline language |
| LangChain | AI framework connecting all tools |
| Ollama | Runs AI models locally |
| llama3.2 | LLM for generating answers |
| mxbai-embed-large | Converts text to vectors (embeddings) |
| ChromaDB | Vector database for storing and searching chunks |

---

## How It Works

### Step 1 — Document Upload & Indexing
```
User uploads document (PDF/TXT)
        ↓
Express receives file → saves in uploads/
        ↓
Calls Python index.py
        ↓
Python reads document → cuts into chunks (1200 chars, 200 overlap)
        ↓
mxbai-embed-large converts each chunk to vectors (numbers)
        ↓
ChromaDB saves all vectors locally
```

### Step 2 — Question & Answer
```
User types a question
        ↓
React sends question to Express API
        ↓
Express calls Python main.py
        ↓
Python converts question to vectors (mxbai)
        ↓
ChromaDB finds top 5 most similar chunks
        ↓
llama3.2 reads chunks → generates answer
        ↓
Express sends answer back to React
        ↓
User sees the answer ✅
```

---

## Key Concepts

### RAG (Retrieval Augmented Generation)
A technique that gives an AI access to your own documents before answering. The AI retrieves relevant information first, then generates an accurate answer based on that information.

### Chunking
Documents are cut into small pieces (chunks) so the AI can search efficiently. Each chunk is 1200 characters with 200 characters of overlap to preserve context between chunks.

### Embeddings
Each chunk is converted into a list of numbers (vectors) by mxbai-embed-large. Similar meaning = similar numbers = better search results.

### Vector Database
ChromaDB stores all vectors locally. When you ask a question, it converts your question to vectors and finds the most similar chunks using math comparison — extremely fast and efficient.

---

## Project Structure

```
newSense/
├── Frontend/                  ← React application
│   ├── src/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── Backend/                   ← Express API server
│   ├── routes/
│   │   ├── ask.js             ← handles questions
│   │   └── upload.js          ← handles file uploads
│   ├── uploads/               ← temporary file storage
│   ├── server.js              ← entry point
│   └── package.json
│
└── AI/                        ← Python RAG pipeline
    ├── index.py               ← indexes documents into ChromaDB
    ├── main.py                ← searches and generates answers
    ├── requirements.txt       ← Python dependencies
    └── chroma_storage/        ← vector database (auto-generated)
```

---

## Installation

### Prerequisites
- Node.js v18+
- Python 3.10+
- Ollama installed ([ollama.com](https://ollama.com))

### Step 1 — Clone the repository
```bash
git clone https://github.com/MarwenCode/newSense.git
cd newSense
```

### Step 2 — Setup Backend
```bash
cd Backend
npm install
```

### Step 3 — Setup Python environment
```bash
cd ../AI
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
```

### Step 4 — Pull Ollama models
```bash
ollama pull llama3.2
ollama pull mxbai-embed-large
```

### Step 5 — Setup Frontend
```bash
cd ../Frontend
npm install
```

---

## Running the App

### Start Ollama
Open Ollama from your applications — it runs in the background automatically.

### Start Backend
```bash
cd Backend
npm run dev
```

### Start Frontend
```bash
cd Frontend
npm run dev
```

Open your browser at `http://localhost:5173` 🚀

---

## API Endpoints

### Upload a document
```
POST /api/upload
Content-Type: multipart/form-data
Body: file (TXT or PDF)

Response: { "message": "File indexed successfully!" }
```

### Ask a question
```
POST /api/ask
Content-Type: application/json
Body: { "question": "your question here" }

Response: { "answer": "AI generated answer..." }
```

---

## Roadmap

- ✅ Document upload and indexing
- ✅ Question answering with RAG
- ✅ Local AI (no API key needed)
- ⏳ React frontend UI
- ⏳ PDF support
- ⏳ Multiple document support
- ⏳ Deploy with Groq + Pinecone (cloud version)
- ⏳ Query expansion for better search results

---

## About

Built as part of my AI engineering portfolio.

**Skills demonstrated:**
- RAG (Retrieval Augmented Generation)
- Vector databases (ChromaDB)
- LLMs (Ollama, Llama3.2)
- Embeddings and semantic search
- LangChain framework
- REST API design (Express.js)
- Full stack development (React + Node.js + Python)

**Author:** Marwen — Junior AI Engineer
- Background: JavaScript / Node.js / React
- Learning: RAG, MCP, Agentic AI, Automation (n8n)

---

## License

MIT License — free to use and modify.
