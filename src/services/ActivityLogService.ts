import { RouteError } from '@src/common/classes'
import HttpStatusCodes from '@src/common/HttpStatusCodes'
import { ActivityLog } from '@src/models/ActivityLog'
import { activityLogRepo } from '@src/repos/ActivityLogRepo'

export const ACTIVITY_LOG_NOT_FOUND_ERR = 'Activity Log not found'

const getAll = () => {
  return activityLogRepo.getAll()
}

const addOne = (activityLog: ActivityLog) => {
  return activityLogRepo.add(activityLog)
}

const updateOne = async (id: string, data: Partial<ActivityLog>) => {
  const persists = await activityLogRepo.persists(id)
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, ACTIVITY_LOG_NOT_FOUND_ERR)
  }
  const updatedAdmin = await activityLogRepo.update(id, data)
  return updatedAdmin
}

const _delete = async (id: string) => {
  const persists = await activityLogRepo.persists(id)
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, ACTIVITY_LOG_NOT_FOUND_ERR)
  }
  return activityLogRepo.delete_(id)
}

export default {
  getAll,
  addOne,
  updateOne,
  delete: _delete,
} as const
