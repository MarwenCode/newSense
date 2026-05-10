import { useState } from 'react'
import Header from './components/Header'
import UploadSection from './components/UploadSection'
import ChatSection from './components/ChatSection'

function App() {
  const [documentName, setDocumentName] = useState('')

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full bg-white shadow-sm">
        <UploadSection onUploadSuccess={setDocumentName} />
        <ChatSection documentName={documentName} />
      </div>
    </div>
  )
}

export default App