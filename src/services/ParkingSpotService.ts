import { RouteError } from '@src/common/classes'
import HttpStatusCodes from '@src/common/HttpStatusCodes'
import { ParkingSpot } from '@src/models/ParkingSpot'
import ParkingSpotRepo from '@src/repos/ParkingSpotRepo'

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

export default {
  getAll,
  addOne,
  updateOne,
  delete: _delete,
} as const
