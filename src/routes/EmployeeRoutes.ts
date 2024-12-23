import EmployeeService from '@src/services/EmployeeService'
import { IReq, IRes } from './common/types'
import HttpStatusCodes from '@src/common/HttpStatusCodes'
import check from './common/check'
import Employee from '@src/models/Employee'
import Authorization from '@src/util/Authorization'
import { UserType } from '@src/models/User'

const getAll = async (req: IReq, res: IRes) => {
  if (!Authorization.isAuthorized(req, res, [UserType.ADMIN])) return
  const employees = await EmployeeService.getAll()
  const publicEmployees = employees.map(employee => Employee.ObtainPublicEmployee(employee))
  res.status(HttpStatusCodes.OK).json({ employees: publicEmployees })
}

const add = async (req: IReq, res: IRes) => {
  if (!Authorization.isAuthorized(req, res, [UserType.ADMIN])) return
  const employee = check.isValid(req.body, 'employee', Employee.isEmployee)
  await EmployeeService.addOne(employee)
  res.status(HttpStatusCodes.CREATED).end()
}

const update = async (req: IReq, res: IRes) => {
  if (!Authorization.isAuthorized(req, res, [UserType.ADMIN])) return
  const id = Number(req.params.id)
  const employee = check.isValid(req.body, 'employee', Employee.isPartialEmployee)
  await EmployeeService.updateOne(id, employee)
  res.status(HttpStatusCodes.OK).end()
}

const delete_ = async (req: IReq, res: IRes) => {
  if (!Authorization.isAuthorized(req, res, [UserType.ADMIN])) return
  const id = Number(req.params.id)
  await EmployeeService.delete(id)
  res.status(HttpStatusCodes.OK).end()
}

export default {
  getAll,
  add,
  update,
  delete: delete_,
}
