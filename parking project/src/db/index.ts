import EnvVars from '@src/common/EnvVars'
import 'dotenv/config'
import { drizzle } from 'drizzle-orm/connect'

async function main() {
  const db = await drizzle('node-postgres', EnvVars.db_url)
}

main()
