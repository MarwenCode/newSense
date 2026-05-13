import { Bot, Zap } from 'lucide-react'

function Header() {
  return (
    <header className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Bot size={28} className="text-purple-600" />
        <div>
          <h1 className="text-lg font-medium text-gray-900">newSense</h1>
          <p className="text-xs text-gray-500">AI document assistant</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Zap size={14} className="text-green-500" />
        <span className="text-xs text-gray-500"> connected</span>
      </div>
    </header>
  )
}

export default Header