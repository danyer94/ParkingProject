import { RouteError } from '@src/common/classes'
import HttpStatusCodes from '@src/common/HttpStatusCodes'
import { Reservation, ReservationStatus } from '@src/models/Reservation'
import { Vehicle } from '@src/models/Vehicle'
import ReservationRepo from '@src/repos/ReservationRepo'
import ParkingSpotRepo from '@src/repos/ParkingSpotRepo'
import ParkingSpotService from './ParkingSpotService'
import VehicleRepo from '@src/repos/VehicleRepo'

export const RESERVATION_NOT_FOUND_ERR = 'Reservation not found'

const getAll = () => {
  return ReservationRepo.getAll()
}

const addOne = (reservation: Reservation) => {
  return ReservationRepo.add(reservation)
}

const updateOne = async (id: number, data: Partial<Reservation>) => {
  const persists = await ReservationRepo.persists(id)
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, RESERVATION_NOT_FOUND_ERR)
  }
  const updatedReservation = await ReservationRepo.update(id, data)
  return updatedReservation
}

const _delete = async (id: number) => {
  const persists = await ReservationRepo.persists(id)
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, RESERVATION_NOT_FOUND_ERR)
  }
  return ReservationRepo.delete_(id)
}

const reserve = async (vehicle: Vehicle, startTime: Date, endTime: Date): Promise<Reservation | null> => {
  // 1. Verify there is an available parking spot
  const availableSpots = await ParkingSpotService.getAvailableSpotsInTimeInterval(startTime, endTime)
  if (availableSpots.length === 0) return null
  else {
    // 2. Create the reservation
    const maxId = await ReservationRepo.getMaxId()
    const reservationId = maxId ? maxId + 1 : 1
    const availableSpotId = availableSpots[0].id
    const reservation: Reservation = {
      id: reservationId,
      customerId: vehicle.customerId,
      vehicleId: vehicle.id,
      parkingSpotId: availableSpotId,
      startTime: startTime,
      endTime: endTime,
      status: ReservationStatus.RESERVED,
    }
    // 3. Add the vehicle to the database if it doesn't exist
    const vehicleExist = await VehicleRepo.getByLicensePlate(vehicle.licensePlate)
    if (!vehicleExist) await VehicleRepo.add(vehicle)

    // 4. Add the reservation to the database
    await ReservationRepo.add(reservation)

    // 5. Mark the parking spot as reserved
    await ParkingSpotRepo.update(availableSpotId, { isReserved: true })

    return reservation
  }
}

export default {
  getAll,
  addOne,
  updateOne,
  delete: _delete,
  reserve,
} as const
