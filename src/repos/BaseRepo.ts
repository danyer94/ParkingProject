import jsonfile from 'jsonfile'

import { IUser } from '@src/models/User'
import { IEmployee } from '@src/models/Employee'
import { Admin } from '@src/models/Admin'
import { Customer } from '@src/models/Customer'
import { Vehicle } from '@src/models/Vehicle'
import { ParkingSpot } from '@src/models/ParkingSpot'
import EnvVars from '@src/common/EnvVars'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from '@src/db/schema'
import { Pool } from 'pg'

// **** Variables **** //

const DB_FILE_NAME = 'database.json'

// **** Types **** //

interface IDb {
  users: IUser[]
  employees: IEmployee[]
  admins: Admin[]
  customers: Customer[]
  vehicles: Vehicle[]
  parkingSpots: ParkingSpot[]
}

// **** Functions **** //

/**
 * Fetch the json from the file.
 */
function openDb(): Promise<IDb> {
  return jsonfile.readFile(__dirname + '/' + DB_FILE_NAME) as Promise<IDb>
}

export const getDatabase = () => {
  // return drizzle('node-postgres', EnvVars.db_url)

  const pool = new Pool({
    connectionString: EnvVars.db_url,
  })
  const db = drizzle(pool, { schema })
  return db
}

// async function getItems<T>(table: string, filter: Partial<T>): Promise<T[]> {
//   const pool = new Pool({
//     connectionString: EnvVars.db_url,
//   })
//   const db = drizzle(pool, { schema })
//   const items = await db.query.adminsTable.findMany({ where: { filter } }) // Aplicar el filtro
//   return items
// }

/**
 * Update the file.
 */
function saveDb(db: IDb): Promise<void> {
  return jsonfile.writeFile(__dirname + '/' + DB_FILE_NAME, db)
}

// **** Export default **** //

export default {
  openDb,
  saveDb,
} as const
