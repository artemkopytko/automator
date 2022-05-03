require('dotenv').config()
require('express-async-errors')

const express = require('express')
// const path = require('path')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
const apiRoutes = require('./routes/main.js')

app.use([morgan('tiny')])
app.use(express.json())
app.use(cors())

app.use('/api/v1', apiRoutes)

app.all('*', (req, res) => {
  res.status(400).send('<h1>Page not found</h1>')
})

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is up at port ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
