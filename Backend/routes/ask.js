import { Router } from 'express'
import fetch from 'node-fetch'

const router = Router()

router.post('/ask', async (req, res) => {
  const { question } = req.body

  if (!question) {
    return res.status(400).json({ error: 'Question is required' })
  }

  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  try {
    const response = await fetch('http://localhost:8000/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    })

    const reader = response.body
    reader.on('data', (chunk) => {
      res.write(`data: ${chunk.toString()}\n\n`)
    })

    reader.on('end', () => {
      res.write('data: [DONE]\n\n')
      res.end()
    })

  } catch (error) {
    res.write('data: [DONE]\n\n')
    res.end()
  }
})

export default router