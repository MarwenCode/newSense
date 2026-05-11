import { spawn } from 'child_process'
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

  const pythonPath = path.join(__dirname, '../../AI/venv/Scripts/python.exe')
  const scriptPath = path.join(__dirname, '../../AI/main.py')

  // Setup SSE headers
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  const python = spawn(pythonPath, [scriptPath, question])

  python.stdout.on('data', (data) => {
    res.write(`data: ${data.toString()}\n\n`)
  })

  python.stderr.on('data', (data) => {
    console.error('Python error:', data.toString())
  })

  python.on('close', () => {
    res.write('data: [DONE]\n\n')
    res.end()
  })
})

export default router