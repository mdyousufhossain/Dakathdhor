/**
 * note eta just beta project so please dont judge my spaghetti code
 * and arekta secret ami ashole production e test kori , :> but eibar tester on kora lagbbe , so choose your expertise
 * 10-aug-24
 */
import  cors  from 'cors'
import credentials, { corsOptions } from './Middleware/credential'
import express from 'express'
import { logger } from './Middleware/logger'
const app = express()

import userRoute from './Route/userRoute'

import { connectionToDatabase } from './Config/moongoose'

const PORT = 9000

/**
 * this is the watcher , well not that good but at least somet'n
 */
app.use(logger)
app.use(credentials)
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// just for the starter delete this not required !



app.use('/api/v1', userRoute);

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
