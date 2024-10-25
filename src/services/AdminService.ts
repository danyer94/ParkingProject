import { RouteError } from '@src/common/classes'
import EnvVars from '@src/common/EnvVars'
import HttpStatusCodes from '@src/common/HttpStatusCodes'
import { Admin } from '@src/models/Admin'
import AdminRepo from '@src/repos/AdminRepo'
import bcrypt from 'bcrypt'

export const ADMIN_NOT_FOUND_ERR = 'Admin not found'

const getAll = () => {
  return AdminRepo.getAll()
}

const addOne = (admin: Admin) => {
  admin.password = bcrypt.hashSync(admin.password, Number(EnvVars.Salt))
  return AdminRepo.add(admin)
}

const updateOne = async (id: number, data: Partial<Admin>) => {
  const persists = await AdminRepo.persists(id)
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, ADMIN_NOT_FOUND_ERR)
  }
  const updatedAdmin = await AdminRepo.update(id, data)
  return updatedAdmin
}

const _delete = async (id: number) => {
  const persists = await AdminRepo.persists(id)
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, ADMIN_NOT_FOUND_ERR)
  }
  return AdminRepo.delete_(id)
}

export default {
  getAll,
  addOne,
  updateOne,
  delete: _delete,
} as const
