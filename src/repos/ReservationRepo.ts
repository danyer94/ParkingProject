import { parkingSpotsTable, reservationsTable } from '@src/db/schema'
import { getDatabase } from './RepoUtils'
import { and, eq, gt, gte, lt, lte, max, sql } from 'drizzle-orm'
import { Reservation, ReservationStatus } from '@src/models/Reservation'
import { ParkingSpot } from '@src/models/ParkingSpot'

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

const getMaxId = async () => {
  try {
    const db = getDatabase()
    // const result = await db.execute(sql<number>`SELECT MAX(id) FROM ${reservationsTable}`)
    const result = await db.select({ max_id: sql<number>`max(${reservationsTable.id})` }).from(reservationsTable)
    return result[0].max_id
  } catch (error) {}
}

/**
 * Retrieves all reservations that overlap with a given time interval.
 *
 * @param startTime The start time of the interval to check for overlapping reservations.
 * @param endTime The end time of the interval to check for overlapping reservations.
 * @returns A promise that resolves to an array of unique Reservation objects that overlap with the given time interval.
 */
const getReservationsOverlapingTimeInterval = async (startTime: Date, endTime: Date) => {
  try {
    const db = getDatabase()
    const allReservations = await db.select().from(reservationsTable)
    const leftOverlappingReservationsPromise = db
      .select()
      .from(reservationsTable)
      .where(
        and(
          eq(reservationsTable.status, ReservationStatus.RESERVED),
          lt(reservationsTable.startTime, endTime),
          gt(reservationsTable.endTime, endTime)
        )
      )
    const rightOverlappingReservationsPromise = db
      .select()
      .from(reservationsTable)
      .where(
        and(
          eq(reservationsTable.status, ReservationStatus.RESERVED),
          lt(reservationsTable.startTime, startTime),
          gt(reservationsTable.endTime, startTime)
        )
      )
    const completelyInsideTheGivenTimeIntervalReservationsPromise = db
      .select()
      .from(reservationsTable)
      .where(
        and(
          eq(reservationsTable.status, ReservationStatus.RESERVED),
          gte(reservationsTable.startTime, startTime),
          lte(reservationsTable.endTime, endTime)
        )
      )
    const [
      leftOverlappingReservations,
      rightOverlappingReservations,
      completelyInsideTheGivenTimeIntervalReservations,
    ] = await Promise.all([
      leftOverlappingReservationsPromise,
      rightOverlappingReservationsPromise,
      completelyInsideTheGivenTimeIntervalReservationsPromise,
    ]) //perform the 3 queries in parallel

    if (
      leftOverlappingReservations.length > 0 ||
      rightOverlappingReservations.length > 0 ||
      completelyInsideTheGivenTimeIntervalReservations.length > 0
    ) {
      const allOverlappingReservations = leftOverlappingReservations
        .concat(rightOverlappingReservations)
        .concat(completelyInsideTheGivenTimeIntervalReservations) //can be repeated
      const uniqueOverlappingReservations = allOverlappingReservations.filter(
        (reservation, index, self) => index === self.findIndex(t => t.id === reservation.id)
      ) //obtaining the unique reservations array
      return uniqueOverlappingReservations as unknown as Reservation[]
    } else return []
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
  getReservationsOverlapingTimeInterval,
  getMaxId,
}
