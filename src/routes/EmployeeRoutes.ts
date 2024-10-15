import EmployeeService from '@src/services/EmployeeService'
import { IReq, IRes } from './common/types'
import HttpStatusCodes from '@src/common/HttpStatusCodes'
import check from './common/check'
import Employee from '@src/models/Employee'

const getAll = async (_: IReq, res: IRes) => {
  const employees = await EmployeeService.getAll()
  res.status(HttpStatusCodes.OK).json({ employees })
}

const add = async (req: IReq, res: IRes) => {
  const employee = check.isValid(req.body, 'employee', Employee.isEmployee)
  await EmployeeService.addOne(employee)
  res.status(HttpStatusCodes.CREATED).end()
}

const update = async (req: IReq, res: IRes) => {
  const id = Number(req.params.id)
  const employee = check.isValid(req.body, 'employee', Employee.isPartialEmployee)
  await EmployeeService.updateOne(id, employee)
  res.status(HttpStatusCodes.OK).end()
}

const delete_ = async (req: IReq, res: IRes) => {
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