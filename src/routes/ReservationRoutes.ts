import ReservationService from '@src/services/ReservationService'
import { IReq, IRes } from './common/types'
import HttpStatusCodes from '@src/common/HttpStatusCodes'
import check from './common/check'
import Reservation from '@src/models/Reservation'
import Vehicle from '@src/models/Vehicle'
import { dateValidaton } from '@src/util'
import Authorization from '@src/util/Authorization'
import { UserType } from '@src/models/User'

const getAll = async (req: IReq, res: IRes) => {
  if (!Authorization.isAuthorized(req, res, [UserType.ADMIN, UserType.EMPLOYEE])) return
  const reservations = await ReservationService.getAll()
  res.status(HttpStatusCodes.OK).json({ reservations })
}

const add = async (req: IReq, res: IRes) => {
  if (!Authorization.isAuthorized(req, res, [UserType.ADMIN])) return
  const reservation = check.isValid(req.body, 'reservation', Reservation.isReservation)
  await ReservationService.addOne(reservation)
  res.status(HttpStatusCodes.CREATED).end()
}

const update = async (req: IReq, res: IRes) => {
  if (!Authorization.isAuthorized(req, res, [UserType.ADMIN])) return
  const id = Number(req.params.id)
  const reservation = check.isValid(req.body, 'reservation', Reservation.isPartialReservation)
  await ReservationService.updateOne(id, reservation)
  res.status(HttpStatusCodes.OK).end()
}

const delete_ = async (req: IReq, res: IRes) => {
  if (!Authorization.isAuthorized(req, res, [UserType.ADMIN])) return
  const id = Number(req.params.id)
  await ReservationService.delete(id)
  res.status(HttpStatusCodes.OK).end()
}

const reserve = async (req: IReq, res: IRes) => {
  if (!Authorization.isAuthorized(req, res, [UserType.ADMIN, UserType.EMPLOYEE, UserType.CUSTOMER])) return
  const vehicle = check.isValid(req.body, 'vehicle', Vehicle.isVehicle)
  const startTime = check.isValid(req.body, 'startTime', dateValidaton)
  const endTime = check.isValid(req.body, 'endTime', dateValidaton)
  const startDate = new Date(startTime)
  const endDate = new Date(endTime)
  const reservationDetails = await ReservationService.reserve(vehicle, startDate, endDate)
  const responseJson = reservationDetails
    ? { reservationDetails }
    : { reservationDetails: 'There are no available spots in the given time interval' }
  res.status(HttpStatusCodes.OK).json(responseJson)
}

export default {
  getAll,
  add,
  update,
  delete: delete_,
  reserve,
}
