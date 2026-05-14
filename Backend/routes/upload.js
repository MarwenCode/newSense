import { Router } from 'express'
import multer from 'multer'
import fetch from 'node-fetch'
import FormData from 'form-data'
import fs from 'fs'

const router = Router()
const upload = multer({ dest: 'uploads/' })

router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' })
  }

  try {
    const form = new FormData()
    form.append('file', fs.createReadStream(req.file.path), req.file.originalname)

    const response = await fetch(`${process.env.FASTAPI_URL}/upload`, {
      method: 'POST',
      body: form
    })

    const data = await response.json()
    res.json(data)

  } catch (error) {
    res.status(500).json({ error: 'Upload failed' })
  }
})

export default router