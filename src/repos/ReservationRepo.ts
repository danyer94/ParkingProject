import { reservationsTable } from '@src/db/schema'
import { getDatabase } from './RepoUtils'
import { eq } from 'drizzle-orm'
import { Reservation } from '@src/models/Reservation'

const getById = async (id: number): Promise<Reservation> => {
  try {
    const db = getDatabase()
    const reservation = (await db.select().from(reservationsTable).where(eq(reservationsTable.id, id)).limit(1))[0]
    return reservation as unknown as Reservation
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

const persists = async (id: number): Promise<boolean> => {
  try {
    const reservation = await getById(id)
    return !!reservation
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

const getAll = async (): Promise<Reservation[]> => {
  try {
    const db = getDatabase()
    const reservations = await db.select().from(reservationsTable)
    return reservations as unknown[] as Reservation[]
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

const add = async (admin: Reservation): Promise<Reservation> => {
  try {
    const db = getDatabase()
    const reservationEntity: typeof reservationsTable.$inferInsert = { ...admin }
    const result = await db.insert(reservationsTable).values(reservationEntity)
    return result as unknown as Reservation
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

const update = async (id: number, data: Partial<Reservation>) => {
  try {
    const db = getDatabase()
    await db.update(reservationsTable).set(data).where(eq(reservationsTable.id, id))
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

const delete_ = async (id: number) => {
  try {
    const db = getDatabase()
    await db.delete(reservationsTable).where(eq(reservationsTable.id, id))
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
