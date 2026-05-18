import { X, Bot } from 'lucide-react'

function WelcomeModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ animation: 'fadeIn 0.25s ease-out' }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal card */}
      <div className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl flex flex-col">

        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-br from-purple-700 to-purple-500 rounded-t-2xl px-6 pt-6 pb-5 flex flex-col items-center text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <div className="bg-white/20 rounded-full p-3 mb-3">
            <Bot size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome to newSense 🤖</h1>
          <p className="text-purple-200 text-sm mt-1">Your AI-powered document assistant</p>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5 text-sm text-gray-700">

          {/* Section 1 — What is newSense */}
          <section>
            <h2 className="font-semibold text-gray-900 text-base mb-1">What is newSense?</h2>
            <p className="leading-relaxed">
              newSense is an AI-powered document assistant. Upload any document and ask questions
              about it in natural language. The AI searches your document first before answering —
              no hallucination, only your data.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* Section 2 — Current Support */}
          <section>
            <h2 className="font-semibold text-gray-900 text-base mb-2">Current Support</h2>
            <ul className="space-y-1.5">
              <li className="flex items-start gap-2">
                <span>✅</span>
                <span><strong>.txt files</strong> supported</span>
              </li>
              <li className="flex items-start gap-2">
                <span>⚠️</span>
                <span>One document per session — upload a new file to start a new conversation</span>
              </li>
            </ul>
          </section>

          <hr className="border-gray-100" />

          {/* Section 3 — Coming Soon */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="font-semibold text-gray-900 text-base">Coming Soon</h2>
              <span className="text-xs font-medium bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                Coming Soon
              </span>
            </div>
            <ul className="space-y-1.5">
              <li className="flex items-start gap-2"><span>1</span><span><strong>User authentication</strong> — save your conversations across sessions</span></li>
              <li className="flex items-start gap-2"><span>2</span><span><strong>PDF support</strong> — upload and chat with PDF files</span></li>
              <li className="flex items-start gap-2"><span>3</span><span><strong>Word (.docx) support</strong> — upload Word documents</span></li>
              <li className="flex items-start gap-2"><span>4</span><span><strong>Markdown (.md) support</strong> — upload markdown files</span></li>
              <li className="flex items-start gap-2"><span>5</span><span><strong>Advanced RAG</strong> — query expansion and multi-query search for better results</span></li>
              <li className="flex items-start gap-2"><span>6</span><span><strong>Cloud storage</strong> — persistent vector database with Pinecone</span></li>
              <li className="flex items-start gap-2"><span>7</span><span><strong>Multi-language support</strong> — chat in French, English, Spanish and more</span></li>
            </ul>
          </section>

          <hr className="border-gray-100" />

          {/* Section 4 — How to use */}
          <section>
            <h2 className="font-semibold text-gray-900 text-base mb-2">How to use</h2>
            <ol className="space-y-1.5">
              <li className="flex items-start gap-2"><span>1️⃣</span><span>Upload your document <strong>(.txt for now)</strong></span></li>
              <li className="flex items-start gap-2"><span>2️⃣</span><span>Wait for <strong>"File indexed successfully!"</strong> confirmation</span></li>
              <li className="flex items-start gap-2"><span>3️⃣</span><span>Ask any question about your document</span></li>
            </ol>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-1 space-y-3 text-center">
          <p className="text-xs text-gray-400">
            Built with React 19 · Node.js · Python · LangChain · ChromaDB · Groq
          </p>
          <a
            href="https://github.com/MarwenCode/newSense"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs text-purple-600 hover:text-purple-800 underline underline-offset-2 transition-colors"
          >
            GitHub — MarwenCode/newSense
          </a>
          <button
            onClick={onClose}
            className="block w-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-semibold py-2.5 rounded-xl transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}

export default WelcomeModal
