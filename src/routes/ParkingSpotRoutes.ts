import ParkingSpotService from '@src/services/ParkingSpotService'
import { IReq, IRes } from './common/types'
import HttpStatusCodes from '@src/common/HttpStatusCodes'
import check from './common/check'
import ParkingSpot from '@src/models/ParkingSpot'

const getAll = async (_: IReq, res: IRes) => {
  const parkingSpots = await ParkingSpotService.getAll()
  res.status(HttpStatusCodes.OK).json({ parkingSpots })
}

const add = async (req: IReq, res: IRes) => {
  const parkingSpot = check.isValid(req.body, 'parkingSpot', ParkingSpot.isParkingSpot)
  await ParkingSpotService.addOne(parkingSpot)
  res.status(HttpStatusCodes.CREATED).end()
}

const update = async (req: IReq, res: IRes) => {
  const id = Number(req.params.id)
  const parkingSpot = check.isValid(req.body, 'parkingSpot', ParkingSpot.isPartialParkingSpot)
  await ParkingSpotService.updateOne(id, parkingSpot)
  res.status(HttpStatusCodes.OK).end()
}

const delete_ = async (req: IReq, res: IRes) => {
  const id = Number(req.params.id)
  await ParkingSpotService.delete(id)
  res.status(HttpStatusCodes.OK).end()
}

export default {
  getAll,
  add,
  update,
  delete: delete_,
}
