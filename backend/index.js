const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}))

app.use(express.json())

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' })
})

const projectRoutes = require('./routes/projects')
const homeRoutes = require('./routes/home')
const servicesRoutes = require('./routes/services')
const resultsRoutes = require('./routes/results')

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})

app.use('/api/projects', projectRoutes)
app.use('/api/home', homeRoutes)
app.use('/api/services', servicesRoutes)
app.use('/api/results', resultsRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
    console.log(`Test the API at: http://localhost:${PORT}/api/test`)
    console.log(`Home API at: http://localhost:${PORT}/api/home`)
    console.log(`Services API at: http://localhost:${PORT}/api/services`)
})

