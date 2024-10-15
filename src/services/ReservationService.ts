import { RouteError } from '@src/common/classes'
import HttpStatusCodes from '@src/common/HttpStatusCodes'
import { Reservation } from '@src/models/Reservation'
import ReservationRepo from '@src/repos/ReservationRepo'

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

export default {
  getAll,
  addOne,
  updateOne,
  delete: _delete,
} as const
