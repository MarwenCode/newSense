import { useState } from 'react'
import { Upload, FileText, CheckCircle } from 'lucide-react'
import axios from 'axios'

function UploadSection({ onUploadSuccess }) {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    setMessage('')
    setSuccess(false)
  }

  const handleUpload = async () => {
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    setUploading(true)
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/upload`, formData)
      setMessage(response.data.message)
      setSuccess(true)
      onUploadSuccess(file.name)
    } catch (error) {
      setMessage('Upload failed. Try again.')
      setSuccess(false)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="p-6 border-b border-gray-200 bg-white">
      <h2 className="text-sm font-medium text-gray-700 mb-4">
        Upload your document
      </h2>

      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
          <FileText size={16} className="text-gray-500" />
          <span className="text-sm text-gray-600">
            {file ? file.name : 'Choose a file'}
          </span>
          <input
            type="file"
            accept=".txt,.pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Upload size={16} />
          {uploading ? 'Indexing...' : 'Upload'}
        </button>
      </div>

      {message && (
        <div className={`mt-3 flex items-center gap-2 text-sm ${success ? 'text-green-600' : 'text-red-500'}`}>
          {success && <CheckCircle size={14} />}
          <span>{message}</span>
        </div>
      )}
    </div>
  )
}

export default UploadSection