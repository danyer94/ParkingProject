import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'
import EnvVars from './src/common/EnvVars'

console.log({ url: EnvVars.db_url })
console.log({ db_url: process.env.DATABASE_URL })

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: String(process.env.DATABASE_URL),
  },
})
