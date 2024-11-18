require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const authenticationMiddleware = require('./middleware/authentication')

// Packages to prevent security
const helmet = require('helmet')
const cors = require('cors')
const xssClean = require('xss-clean')
const rateLimiter = require('express-rate-limit')
// Swagger
const swaggerUI = require('swagger-ui-express')
const path = require('path');
const yaml = require('yamljs');
const swaggerDocument = yaml.load(path.join(__dirname, 'swagger.yaml')); 


// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// connectDB
const connectDB = require('./db/connect')

// routers
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

app.set('trust proxy', 1)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100
  })
)
app.use(helmet())
app.use(cors({
    credentials: '*'
}))
app.use(xssClean())
app.use(express.json())
// extra packages

// Load Swagger
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticationMiddleware, jobsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5001

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => console.log(`Server is listening on PORT: ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()
