import ParkingSpotService from '@src/services/ParkingSpotService'
import { IReq, IRes } from './common/types'
import HttpStatusCodes from '@src/common/HttpStatusCodes'
import check from './common/check'
import ParkingSpot from '@src/models/ParkingSpot'
import { dateValidaton, isValidDate } from '@src/util'
import Authorization from '@src/util/Authorization'
import { UserType } from '@src/models/User'

const getAll = async (req: IReq, res: IRes) => {
  if (!Authorization.isAuthorized(req, res, [UserType.ADMIN, UserType.EMPLOYEE])) return
  const parkingSpots = await ParkingSpotService.getAll()
  res.status(HttpStatusCodes.OK).json({ parkingSpots })
}

const add = async (req: IReq, res: IRes) => {
  if (!Authorization.isAuthorized(req, res, [UserType.ADMIN])) return
  const parkingSpot = check.isValid(req.body, 'parkingSpot', ParkingSpot.isParkingSpot)
  await ParkingSpotService.addOne(parkingSpot)
  res.status(HttpStatusCodes.CREATED).end()
}

const update = async (req: IReq, res: IRes) => {
  if (!Authorization.isAuthorized(req, res, [UserType.ADMIN])) return
  const id = Number(req.params.id)
  const parkingSpot = check.isValid(req.body, 'parkingSpot', ParkingSpot.isPartialParkingSpot)
  await ParkingSpotService.updateOne(id, parkingSpot)
  res.status(HttpStatusCodes.OK).end()
}

const delete_ = async (req: IReq, res: IRes) => {
  if (!Authorization.isAuthorized(req, res, [UserType.ADMIN])) return
  const id = Number(req.params.id)
  await ParkingSpotService.delete(id)
  res.status(HttpStatusCodes.OK).end()
}

const getParkingOccupationDetails = async (req: IReq, res: IRes) => {
  if (!Authorization.isAuthorized(req, res, [UserType.ADMIN, UserType.EMPLOYEE])) return
  const timeString = check.isValid(req.body, 'time', dateValidaton)
  const time = new Date(timeString)
  const parkingOccupationDetails = await ParkingSpotService.parkingOccupationDetails(time)
  res.status(HttpStatusCodes.OK).json({ parkingOccupationDetails })
}

export default {
  getAll,
  add,
  update,
  delete: delete_,
  getParkingOccupationDetails,
}
