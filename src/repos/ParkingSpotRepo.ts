import { parkingSpotsTable } from '@src/db/schema'
import { ParkingSpot } from '@src/models/ParkingSpot'
import { getDatabase } from './RepoUtils'
import { eq } from 'drizzle-orm'

class ParkingSpotRepo {
  static getById = async (id: number) => {
    try {
      const db = await getDatabase()
      const parkingSpot = await db.query.parkingSpotsTable.findFirst({ with: { id } })
      return parkingSpot as ParkingSpot
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }

  static persists = async (id: number): Promise<boolean> => {
    try {
      const parkingSpot = await this.getById(id)
      return !!parkingSpot
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }

  static getAll = async () => {
    try {
      const db = await getDatabase()
      const parkingSpots = await db.select().from(parkingSpotsTable)
      return parkingSpots as ParkingSpot[]
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }

  static getByFilter = async (filter: Partial<ParkingSpot>): Promise<ParkingSpot[]> => {
    try {
      const db = await getDatabase()
      const items = await db.query.parkingSpotsTable.findMany({ with: filter })
      return items
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }

  static add = async (parkingSpot: ParkingSpot) => {
    try {
      const db = await getDatabase()
      const parkingSpotEntity: typeof parkingSpotsTable.$inferInsert = { ...parkingSpot }
      const result = await db.insert(parkingSpotsTable).values(parkingSpotEntity)
      return result as unknown as ParkingSpot
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }

  static update = async (id: number, data: Partial<ParkingSpot>) => {
    try {
      const db = await getDatabase()
      const result = await db.update(parkingSpotsTable).set(data).where(eq(parkingSpotsTable.id, id))
      return result as unknown as ParkingSpot
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }

  static delete_ = async (id: number) => {
    try {
      const db = await getDatabase()
      await db.delete(parkingSpotsTable).where(eq(parkingSpotsTable.id, id))
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }
}

export default ParkingSpotRepo
