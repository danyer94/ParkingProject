import { RouteError } from '@src/common/classes'
import HttpStatusCodes from '@src/common/HttpStatusCodes'
import { Vehicle } from '@src/models/Vehicle'
import VehicleRepo from '@src/repos/VehicleRepo'

export const VEHICLE_NOT_FOUND_ERR = 'Vehicle not found'

const getAll = () => {
  return VehicleRepo.getAll()
}

const addOne = (vehicle: Vehicle) => {
  return VehicleRepo.add(vehicle)
}

const updateOne = async (id: number, data: Partial<Vehicle>) => {
  const persists = await VehicleRepo.persists(id)
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, VEHICLE_NOT_FOUND_ERR)
  }
  const updatedVehicle = await VehicleRepo.update(id, data)
  return updatedVehicle
}

const _delete = async (id: number) => {
  const persists = await VehicleRepo.persists(id)
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, VEHICLE_NOT_FOUND_ERR)
  }
  return VehicleRepo.delete_(id)
}

export default {
  getAll,
  addOne,
  updateOne,
  delete: _delete,
} as const
