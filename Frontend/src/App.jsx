import { useState, useEffect } from 'react'
import Header from './components/Header'
import UploadSection from './components/UploadSection'
import ChatSection from './components/ChatSection'
import Sidebar from './components/Sidebar'

function App() {
  

  // Load conversations from localStorage on startup
 const getSavedConversations = () => {
  const saved = localStorage.getItem('newsense_conversations')
  return saved ? JSON.parse(saved) : []
}

const [conversations, setConversations] = useState(getSavedConversations)
const [activeConversation, setActiveConversation] = useState(() => {
  const saved = getSavedConversations()
  return saved.length > 0 ? saved[0] : null
})

  // Save conversations to localStorage every time they change
  useEffect(() => {
    localStorage.setItem('newsense_conversations', JSON.stringify(conversations))
  }, [conversations])

  const handleUploadSuccess = (fileName) => {
    // Check if conversation for this file already exists
    const existing = conversations.find(c => c.fileName === fileName)
    if (existing) {
      setActiveConversation(existing)
      return
    }

    // Create new conversation
    const newConversation = {
      id: Date.now(),
      fileName,
      date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      messages: []
    }

    setConversations(prev => [newConversation, ...prev])
    setActiveConversation(newConversation)
  }

  const updateMessages = (messages) => {
    setActiveConversation(prev => ({ ...prev, messages }))
    setConversations(prev =>
      prev.map(c => c.id === activeConversation.id ? { ...c, messages } : c)
    )
  }

  const handleSelectConversation = (conversation) => {
    setActiveConversation(conversation)
  }

  const handleDeleteConversation = (id) => {
    const updated = conversations.filter(c => c.id !== id)
    setConversations(updated)
    setActiveConversation(updated.length > 0 ? updated[0] : null)
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          conversations={conversations}
          activeConversation={activeConversation}
          onSelect={handleSelectConversation}
          onDelete={handleDeleteConversation}
        />
        <div className="flex flex-col flex-1 bg-white overflow-hidden">
          <UploadSection onUploadSuccess={handleUploadSuccess} />
          <ChatSection
            activeConversation={activeConversation}
            onUpdateMessages={updateMessages}
          />
        </div>
      </div>
    </div>
  )
}

export default App