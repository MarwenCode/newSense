import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import askRoute from './routes/ask.js'
import uploadRoute from './routes/upload.js'


const app = express()
const PORT = process.env.PORT || 5000 

app.use(cors())
app.use(express.json())

app.use('/api', askRoute)
app.use('/api', uploadRoute)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})