import VehicleService from '@src/services/VehicleService'
import { IReq, IRes } from './common/types'
import HttpStatusCodes from '@src/common/HttpStatusCodes'
import check from './common/check'
import Vehicle from '@src/models/Vehicle'
import Authorization from '@src/util/Authorization'
import { UserType } from '@src/models/User'

const getAll = async (req: IReq, res: IRes) => {
  if (!Authorization.isAuthorized(req, res, [UserType.ADMIN])) return
  const vehicles = await VehicleService.getAll()
  res.status(HttpStatusCodes.OK).json({ vehicles })
}

const add = async (req: IReq, res: IRes) => {
  if (!Authorization.isAuthorized(req, res, [UserType.ADMIN])) return
  const vehicle = check.isValid(req.body, 'vehicle', Vehicle.isVehicle)
  await VehicleService.addOne(vehicle)
  res.status(HttpStatusCodes.CREATED).end()
}

const update = async (req: IReq, res: IRes) => {
  if (!Authorization.isAuthorized(req, res, [UserType.ADMIN])) return
  const id = Number(req.params.id)
  const vehicle = check.isValid(req.body, 'vehicle', Vehicle.isPartialVehicle)
  await VehicleService.updateOne(id, vehicle)
  res.status(HttpStatusCodes.OK).end()
}

const delete_ = async (req: IReq, res: IRes) => {
  if (!Authorization.isAuthorized(req, res, [UserType.ADMIN])) return
  const id = Number(req.params.id)
  await VehicleService.delete(id)
  res.status(HttpStatusCodes.OK).end()
}

export default {
  getAll,
  add,
  update,
  delete: delete_,
}
