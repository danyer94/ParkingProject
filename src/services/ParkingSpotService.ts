import { RouteError } from '@src/common/classes'
import HttpStatusCodes from '@src/common/HttpStatusCodes'
import { ParkingSpot } from '@src/models/ParkingSpot'
import ParkingSpotRepo from '@src/repos/ParkingSpotRepo'
import ReservationRepo from '@src/repos/ReservationRepo'

export const PARKING_SPOT_NOT_FOUND_ERR = 'ParkingSpot not found'

const getAll = () => {
  return ParkingSpotRepo.getAll()
}

const addOne = (parkingSpot: ParkingSpot) => {
  return ParkingSpotRepo.add(parkingSpot)
}

const updateOne = async (id: number, data: Partial<ParkingSpot>) => {
  const persists = await ParkingSpotRepo.persists(id)
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, PARKING_SPOT_NOT_FOUND_ERR)
  }
  const updatedParkingSpot = await ParkingSpotRepo.update(id, data)
  return updatedParkingSpot
}

const _delete = async (id: number) => {
  const persists = await ParkingSpotRepo.persists(id)
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, PARKING_SPOT_NOT_FOUND_ERR)
  }
  return ParkingSpotRepo.delete_(id)
}

/**
 * Retrieves all reserved parking spots in a given time interval.
 *
 * @param startTime The start time of the interval to check for reserved parking spots.
 * @param endTime The end time of the interval to check for reserved parking spots.
 * @returns A promise that resolves to an array of unique ParkingSpot objects that are reserved in the given time interval.
 */
const getReservedSpotsInTimeInterval = async (startTime: Date, endTime: Date) => {
  try {
    //1. Obtain the overlapping reservations in the time interval
    const overlappingReservations = await ReservationRepo.getReservationsOverlapingTimeInterval(startTime, endTime)

    //2. Obtain the parkingSpots associated with that reservations, this are the occupied parkingSpot in that time interval
    const occupiedParkingSpotIds = overlappingReservations.map(reservation => reservation.parkingSpotId)

    //3. Obtain all the parkingSpots that are occupied, that is, the reserved parkingSpots in that time interval
    const reservedSpots = await ParkingSpotRepo.getIncludedIds(occupiedParkingSpotIds)

    return reservedSpots
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

/**
 * Retrieves all available parking spots in a given time interval.
 *
 * @param startTime The start time of the interval to check for available parking spots.
 * @param endTime The end time of the interval to check for available parking spots.
 * @returns A promise that resolves to an array of unique ParkingSpot objects that are available in the given time interval.
 */
const getAvailableSpotsInTimeInterval = async (startTime: Date, endTime: Date) => {
  try {
    //Obtain all the parkingSpots that are not occupied, that is, the available parkingSpots in that time interval
    const reservedSpots = await getReservedSpotsInTimeInterval(startTime, endTime)
    const availableSpots = await ParkingSpotRepo.getExcludedIds(reservedSpots.map(spot => spot.id))
    return availableSpots
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

export default {
  getAll,
  addOne,
  updateOne,
  delete: _delete,
  getReservedSpotsInTimeInterval,
  getAvailableSpotsInTimeInterval,
} as const
