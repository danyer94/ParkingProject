import ReservationService from '@src/services/ReservationService'
import { IReq, IRes } from './common/types'
import HttpStatusCodes from '@src/common/HttpStatusCodes'
import check from './common/check'
import Reservation from '@src/models/Reservation'

const getAll = async (_: IReq, res: IRes) => {
  const reservations = await ReservationService.getAll()
  res.status(HttpStatusCodes.OK).json({ reservations })
}

const add = async (req: IReq, res: IRes) => {
  const reservation = check.isValid(req.body, 'reservation', Reservation.isReservation)
  await ReservationService.addOne(reservation)
  res.status(HttpStatusCodes.CREATED).end()
}

const update = async (req: IReq, res: IRes) => {
  const id = Number(req.params.id)
  const reservation = check.isValid(req.body, 'reservation', Reservation.isPartialReservation)
  await ReservationService.updateOne(id, reservation)
  res.status(HttpStatusCodes.OK).end()
}

const delete_ = async (req: IReq, res: IRes) => {
  const id = Number(req.params.id)
  await ReservationService.delete(id)
  res.status(HttpStatusCodes.OK).end()
}

export default {
  getAll,
  add,
  update,
  delete: delete_,
}
