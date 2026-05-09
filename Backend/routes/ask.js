import { exec } from 'child_process'
import { Router } from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = Router()

router.post('/ask', (req, res) => {
  const { question } = req.body

  if (!question) {
    return res.status(400).json({ error: 'Question is required' })
  }

  const pythonPath = path.join(__dirname, '../../ai/venv/Scripts/python.exe')
  const scriptPath = path.join(__dirname, '../../ai/main.py')

  exec(`"${pythonPath}" "${scriptPath}" "${question}"`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ 
        error: 'Something went wrong',
        details: stderr
      })
    }
    res.json({ answer: stdout })
  })
})

export default router