import EnvVars from '@src/common/EnvVars'
import 'dotenv/config'
import { drizzle } from 'drizzle-orm/connect'
import mongoose from 'mongoose'

const main = async () => {
  console.log({ DB_URL: EnvVars.db_url })
  console.log(`...Connecting to the database ${EnvVars.db_url}`)
  const db = await drizzle('node-postgres', EnvVars.db_url)
  if (db) console.log('Connection to the Postgres database was successful')
  else console.log('Connection to the Postgres database failed')
}

main()

mongoose.Promise = global.Promise
let isConnected = false
let mongoDB: typeof mongoose = {} as typeof mongoose

const MongoDBConnect = (url: string): Promise<typeof mongoose> => {
  if (isConnected) return Promise.resolve(mongoDB as typeof mongoose)
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url)
      .then(mongodb => {
        console.log('MongoDB connected to: ' + url)
        isConnected = mongodb.connection.readyState === 1
        resolve(mongodb)
      })
      .catch(err => {
        console.log('MongoDB connection error')
        console.log(err)
        reject(err)
      })
  })
}

export { MongoDBConnect }
