import { MessageSquare, Trash2, Clock } from 'lucide-react'

function Sidebar({ conversations, activeConversation, onSelect, onDelete }) {
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col overflow-hidden">
      
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Conversations
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 && (
          <div className="p-4 text-center">
            <MessageSquare size={24} className="mx-auto text-gray-300 mb-2" />
            <p className="text-xs text-gray-400">No conversations yet</p>
            <p className="text-xs text-gray-400">Upload a document to start</p>
          </div>
        )}

        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => onSelect(conversation)}
            className={`p-3 cursor-pointer border-b border-gray-100 hover:bg-gray-100 transition-colors group relative ${
              activeConversation?.id === conversation.id
                ? 'bg-purple-50 border-l-2 border-l-purple-600'
                : ''
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {conversation.fileName}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock size={10} className="text-gray-400" />
                  <p className="text-xs text-gray-400">{conversation.date}</p>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {conversation.messages.length} messages
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(conversation.id)
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-red-500 text-gray-400"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Sidebar