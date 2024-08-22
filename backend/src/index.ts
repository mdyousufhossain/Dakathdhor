/**
 * note eta just beta project so please dont judge my spaghetti code
 * and arekta secret ami ashole production e test kori , :> but eibar tester on kora lagbbe , so choose your expertise
 * 10-aug-24
 */
import  cors  from 'cors'
import credentials, { corsOptions } from './Middleware/credential'
import cookieParser from 'cookie-parser'
import express from 'express'
// middlewhware
import { logger } from './Middleware/logger'
import verifyJWT from './Middleware/verifyJWT'
const app = express()

// router
import userRoute from './Route/userRoute'
// protected routes
import taskRoute from './Route/taskRoute'
import userInfo  from './Route/userInfoRoute'
import { connectionToDatabase } from './Config/moongoose'

const PORT = 9000

/**
 * this is the watcher , well not that good but at least somet'n
 */
app.use(logger)
app.use(credentials)
app.use(cookieParser());
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// just for the starter delete this not required !



app.use('/api/v1', userRoute);

//app.use(verifyJWT)
app.use('api/v1', taskRoute )
app.use('api/v1', userInfo )
// app.use('/', (req, res) => {
//   res.send('Hello Dakath!')
// })

const startServer = async () => {
  try {
    // database calling 
    await connectionToDatabase()
    app.listen(PORT, () => {
      // maybe remove when on live ?
      console.log(`Server started at : http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error(error)
  }
}

startServer()
