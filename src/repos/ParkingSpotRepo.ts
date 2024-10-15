import { parkingSpotsTable } from '@src/db/schema'
import { ParkingSpot } from '@src/models/ParkingSpot'
import { getDatabase } from './RepoUtils'
import { eq } from 'drizzle-orm'

const getById = async (id: number) => {
  try {
    const db = getDatabase()
    const parkingSpot = (await db.select().from(parkingSpotsTable).where(eq(parkingSpotsTable.id, id)).limit(1))[0]
    return parkingSpot as ParkingSpot
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

const persists = async (id: number): Promise<boolean> => {
  try {
    const parkingSpot = await getById(id)
    return !!parkingSpot
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

const getAll = async () => {
  try {
    const db = getDatabase()
    const parkingSpots = await db.select().from(parkingSpotsTable)
    return parkingSpots as ParkingSpot[]
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

// const getByFilter = async (filter: Partial<ParkingSpot>): Promise<ParkingSpot[]> => {
//   try {
//     const db = getDatabase()
//     const items = await db.query.parkingSpotsTable.findMany({ with: filter })
//     return items
//   } catch (error) {
//     throw new Error(JSON.stringify(error))
//   }
// }

const add = async (parkingSpot: ParkingSpot) => {
  try {
    const db = getDatabase()
    const parkingSpotEntity: typeof parkingSpotsTable.$inferInsert = { ...parkingSpot }
    const result = await db.insert(parkingSpotsTable).values(parkingSpotEntity)
    return result as unknown as ParkingSpot
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

const update = async (id: number, data: Partial<ParkingSpot>) => {
  try {
    const db = getDatabase()
    await db.update(parkingSpotsTable).set(data).where(eq(parkingSpotsTable.id, id))
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

const delete_ = async (id: number) => {
  try {
    const db = getDatabase()
    await db.delete(parkingSpotsTable).where(eq(parkingSpotsTable.id, id))
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
