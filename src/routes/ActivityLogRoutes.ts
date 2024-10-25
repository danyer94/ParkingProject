import Authorization from '@src/util/Authorization'
import { IReq, IRes } from './common/types'
import { UserType } from '@src/models/User'
import HttpStatusCodes from '@src/common/HttpStatusCodes'
import ActivityLogService from '@src/services/ActivityLogService'
import ActivityLog from '@src/models/ActivityLog'
import check from './common/check'

const getAll = async (req: IReq, res: IRes) => {
  if (!Authorization.isAuthorized(req, res, [UserType.ADMIN])) return
  const activityLogs = await ActivityLogService.getAll()
  res.status(HttpStatusCodes.OK).json({ activityLogs })
}

const add = async (req: IReq, res: IRes) => {
  if (!Authorization.isAuthorized(req, res, [UserType.ADMIN])) return
  const activityLog = check.isValid(req.body, 'activityLog', ActivityLog.isActivityLog)
  await ActivityLogService.addOne(activityLog)
  res.status(HttpStatusCodes.CREATED).end()
}

const update = async (req: IReq, res: IRes) => {
  if (!Authorization.isAuthorized(req, res, [UserType.ADMIN])) return
  const id = String(req.params.id)
  const activityLog = check.isValid(req.body, 'activityLog', ActivityLog.isPartialActivityLog)
  await ActivityLogService.updateOne(id, activityLog)
  res.status(HttpStatusCodes.OK).end()
}

const delete_ = async (req: IReq, res: IRes) => {
  if (!Authorization.isAuthorized(req, res, [UserType.ADMIN])) return
  const id = String(req.params.id)
  await ActivityLogService.delete(id)
  res.status(HttpStatusCodes.OK).end()
}

export default {
  getAll,
  add,
  update,
  delete: delete_,
}
