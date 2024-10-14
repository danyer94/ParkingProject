import { vehiclesTable } from '@src/db/schema'
import { Vehicle } from '@src/models/Vehicle'
import { getDatabase } from './RepoUtils'
import { eq } from 'drizzle-orm'

class VehicleRepo {
  static getById = async (id: number) => {
    try {
      const db = await getDatabase()
      const vehicle = await db.query.vehiclesTable.findFirst({ with: { id } })
      return vehicle as Vehicle
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }

  static persists = async (id: number): Promise<boolean> => {
    try {
      const vehicle = await this.getById(id)
      return !!vehicle
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }

  static getAll = async (): Promise<Vehicle[]> => {
    try {
      const db = await getDatabase()
      const vehicles = await db.select().from(vehiclesTable)
      return vehicles as unknown[] as Vehicle[]
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }

  static getByFilter = async (filter: Partial<Vehicle>): Promise<Vehicle[]> => {
    try {
      const db = await getDatabase()
      const items = await db.query.vehiclesTable.findMany({ with: filter })
      return items
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }

  static add = async (vehicle: Vehicle): Promise<Vehicle> => {
    try {
      const db = await getDatabase()
      const vehicleEntity: typeof vehiclesTable.$inferInsert = { ...vehicle }
      const result = await db.insert(vehiclesTable).values(vehicleEntity)
      return result as unknown as Vehicle
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }

  static update = async (id: number, data: Partial<Vehicle>): Promise<Vehicle> => {
    try {
      const db = await getDatabase()
      const result = await db.update(vehiclesTable).set(data).where(eq(vehiclesTable.id, id))
      return result as unknown as Vehicle
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }

  static delete_ = async (id: number): Promise<void> => {
    try {
      const db = await getDatabase()
      await db.delete(vehiclesTable).where(eq(vehiclesTable.id, id))
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }
}

export default VehicleRepo
