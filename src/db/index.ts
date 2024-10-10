import EnvVars from '@src/common/EnvVars'
import 'dotenv/config'
import { drizzle } from 'drizzle-orm/connect'

const main = async () => {
  console.log({ DB_URL: EnvVars.db_url })
  console.log(`...Connecting to the database ${EnvVars.db_url}`)
  const db = await drizzle('node-postgres', EnvVars.db_url)
  if (db) console.log('Connection to the database was successful')
  else console.log('Connection to the database failed')
}

main()
