# newSense 🤖

An AI-powered document assistant that lets users upload their own documents and ask questions about them. Built with React, Node.js, Express, Python, LangChain, ChromaDB and Ollama or Groq.

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
- ✅ Two versions — local (Ollama) or cloud (Groq)
- ✅ Streaming responses — words appear one by one like Claude
- ✅ No hallucination — answers come only from your documents

---

## Two Versions — Two Branches

| | main branch | feature/groq-streaming branch |
|---|---|---|
| **LLM** | Ollama llama3.2 (local) | Groq API llama-3.3-70b (cloud) |
| **Embeddings** | mxbai-embed-large (Ollama) | all-MiniLM-L6-v2 (HuggingFace) |
| **Streaming** | ❌ | ✅ Word by word |
| **API Key** | ❌ Not needed | ✅ Groq free key |
| **Speed** | Depends on your computer | Very fast ✅ |
| **Privacy** | 100% local ✅ | Data sent to Groq |
| **Cost** | Free forever | Free tier (1000 req/day) |

---

## Tech Stack

### Frontend
| Tool | Purpose |
|---|---|
| React 19 | User interface |
| Vite | Build tool |
| Tailwind CSS | Styling |
| Axios | HTTP requests to backend |
| Lucide React | Icons |

### Backend
| Tool | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express | API server |
| Multer | File upload handling |
| child_process | Bridge between Node.js and Python |

### AI / Python (main branch — local)
| Tool | Purpose |
|---|---|
| Python | AI pipeline language |
| LangChain | AI framework connecting all tools |
| Ollama | Runs AI models locally |
| llama3.2 | LLM for generating answers |
| mxbai-embed-large | Converts text to vectors (embeddings) |
| ChromaDB | Vector database for storing and searching chunks |

### AI / Python (feature/groq-streaming — cloud)
| Tool | Purpose |
|---|---|
| Python | AI pipeline language |
| LangChain | AI framework connecting all tools |
| Groq API | Fast cloud LLM (llama-3.3-70b-versatile) |
| HuggingFace | Local embeddings (all-MiniLM-L6-v2) |
| ChromaDB | Vector database for storing and searching chunks |

---

## How It Works

### Step 1 — Document Upload & Indexing
```
User uploads document (TXT)
        ↓
Express receives file → saves in uploads/
        ↓
Calls Python index.py
        ↓
Python reads document → cuts into chunks (1200 chars, 200 overlap)
        ↓
Embeddings model converts each chunk to vectors (numbers)
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
Python converts question to vectors
        ↓
ChromaDB finds top 5 most similar chunks
        ↓
LLM reads chunks → generates answer (streamed word by word)
        ↓
Express streams answer back to React
        ↓
User sees words appearing one by one ✅
```

---

## Key Concepts

### RAG (Retrieval Augmented Generation)
A technique that gives an AI access to your own documents before answering. The AI retrieves relevant information first, then generates an accurate answer based on that information.

### Chunking
Documents are cut into small pieces (chunks) so the AI can search efficiently. Each chunk is 1200 characters with 200 characters of overlap to preserve context between chunks.

### Embeddings
Each chunk is converted into a list of numbers (vectors) by the embedding model. Similar meaning = similar numbers = better search results.

### Vector Database
ChromaDB stores all vectors locally. When you ask a question, it converts your question to vectors and finds the most similar chunks using math comparison — extremely fast and efficient.

### Streaming
Instead of waiting for the full answer, the LLM sends words one by one as they are generated — exactly like Claude or ChatGPT. This makes the app feel fast and responsive.

---

## Project Structure

```
newSense/
├── Frontend/                  ← React 19 application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── UploadSection.jsx
│   │   │   └── ChatSection.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── Backend/                   ← Express API server
│   ├── routes/
│   │   ├── ask.js             ← handles questions + streaming
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

### Step 1 — Clone the repository
```bash
git clone https://github.com/MarwenCode/newSense.git
cd newSense
```

### Step 2 — Choose your version

**Local version (main branch):**
```bash
git checkout main
```
Requires Ollama installed ([ollama.com](https://ollama.com))

**Cloud version (Groq + Streaming):**
```bash
git checkout feature/groq-streaming
```
Requires a free Groq API key ([console.groq.com](https://console.groq.com))

---

### Step 3 — Setup Backend
```bash
cd Backend
npm install
```

### Step 4 — Setup Python environment
```bash
cd ../AI
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
```

### Step 5 — Setup Frontend
```bash
cd ../Frontend
npm install
```

### Step 6 — Environment variables (Groq branch only)
Create a `.env` file in the `AI/` folder:
```
GROQ_API_KEY=your_groq_api_key_here
```

---

## Running the App

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
Body: file (TXT)

Response: { "message": "File indexed successfully!" }
```

### Ask a question
```
POST /api/ask
Content-Type: application/json
Body: { "question": "your question here" }

Response: streaming text (word by word)
```

---

## Roadmap

- ✅ Document upload and indexing
- ✅ Question answering with RAG
- ✅ Local AI version (Ollama + mxbai)
- ✅ Cloud AI version (Groq + HuggingFace)
- ✅ Streaming responses (word by word)
- ✅ React 19 frontend with Tailwind CSS
- ✅ Conversational AI (greetings + document Q&A)
- ⏳ PDF support
- ⏳ Multiple document support
- ⏳ Deploy on Railway + Vercel
- ⏳ Query expansion for better search results

---

## About

Built as part of my AI engineering portfolio.

**Skills demonstrated:**
- RAG (Retrieval Augmented Generation)
- Vector databases (ChromaDB)
- LLMs (Ollama, Groq, Llama3)
- Embeddings and semantic search (mxbai, HuggingFace)
- LangChain framework
- Streaming responses (SSE)
- REST API design (Express.js)
- Full stack development (React 19 + Node.js + Python)

**Author:** Marwen
- Background: JavaScript / Node.js / React
- Learning: RAG, MCP, Agentic AI, Automation (n8n)

---

## License

MIT License — free to use and modify.