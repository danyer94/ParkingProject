import AdminService from '@src/services/AdminService'
import { IReq, IRes } from './common/types'
import HttpStatusCodes from '@src/common/HttpStatusCodes'
import check from './common/check'
import Admin from '@src/models/Admin'
import Authorization from '@src/util/Authorization'
import { UserType } from '@src/models/User'

const getAll = async (req: IReq, res: IRes) => {
  if (!Authorization.isAuthorized(req, res, [UserType.ADMIN])) return
  const admins = await AdminService.getAll()
  const publicAdmins = admins.map(admin => Admin.ObtainPublicAdmin(admin))
  res.status(HttpStatusCodes.OK).json({ admins: publicAdmins })
}

const add = async (req: IReq, res: IRes) => {
  if (!Authorization.isAuthorized(req, res, [UserType.ADMIN])) return
  const admin = check.isValid(req.body, 'admin', Admin.isAdmin)
  await AdminService.addOne(admin)
  res.status(HttpStatusCodes.CREATED).end()
}

const update = async (req: IReq, res: IRes) => {
  if (!Authorization.isAuthorized(req, res, [UserType.ADMIN])) return
  const id = Number(req.params.id)
  const admin = check.isValid(req.body, 'admin', Admin.isPartialAdmin)
  await AdminService.updateOne(id, admin)
  res.status(HttpStatusCodes.OK).end()
}

const delete_ = async (req: IReq, res: IRes) => {
  if (!Authorization.isAuthorized(req, res, [UserType.ADMIN])) return
  const id = Number(req.params.id)
  await AdminService.delete(id)
  res.status(HttpStatusCodes.OK).end()
}

export default {
  getAll,
  add,
  update,
  delete: delete_,
}
