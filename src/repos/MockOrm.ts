import jsonfile from 'jsonfile'

import { IUser } from '@src/models/User'
import { Employee } from '@src/models/Employee'
import { Admin } from '@src/models/Admin'
import { Customer } from '@src/models/Customer'
import { Vehicle } from '@src/models/Vehicle'
import { ParkingSpot } from '@src/models/ParkingSpot'

// **** Variables **** //

const DB_FILE_NAME = 'database.json'

// **** Types **** //

interface IDb {
  users: IUser[]
  employees: Employee[]
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
