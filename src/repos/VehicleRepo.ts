import { vehiclesTable } from '@src/db/schema'
import { Vehicle } from '@src/models/Vehicle'
import { getDatabase } from './RepoUtils'
import { eq } from 'drizzle-orm'

const getById = async (id: number) => {
  try {
    const db = getDatabase()
    const vehicle = (await db.select().from(vehiclesTable).where(eq(vehiclesTable.id, id)).limit(1))[0]
    return vehicle as Vehicle
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

const persists = async (id: number): Promise<boolean> => {
  try {
    const vehicle = await getById(id)
    return !!vehicle
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

const getAll = async (): Promise<Vehicle[]> => {
  try {
    const db = getDatabase()
    const vehicles = await db.select().from(vehiclesTable)
    return vehicles as unknown[] as Vehicle[]
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

// const getByFilter = async (filter: Partial<Vehicle>): Promise<Vehicle[]> => {
//   try {
//     const db = getDatabase()
//     const items = await db.query.vehiclesTable.findMany({ with: filter })
//     return items
//   } catch (error) {
//     throw new Error(JSON.stringify(error))
//   }
// }

const add = async (vehicle: Vehicle): Promise<Vehicle> => {
  try {
    const db = getDatabase()
    const vehicleEntity: typeof vehiclesTable.$inferInsert = { ...vehicle }
    const result = await db.insert(vehiclesTable).values(vehicleEntity)
    return result as unknown as Vehicle
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

const update = async (id: number, data: Partial<Vehicle>): Promise<Vehicle> => {
  try {
    const db = getDatabase()
    const result = await db.update(vehiclesTable).set(data).where(eq(vehiclesTable.id, id))
    return result as unknown as Vehicle
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

const delete_ = async (id: number): Promise<void> => {
  try {
    const db = getDatabase()
    await db.delete(vehiclesTable).where(eq(vehiclesTable.id, id))
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

export default {
  getById,
  getAll,
  persists,
  add,
  update,
  delete_,
}
