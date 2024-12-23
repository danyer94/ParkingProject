import { RouteError } from '@src/common/classes'
import EnvVars from '@src/common/EnvVars'
import HttpStatusCodes from '@src/common/HttpStatusCodes'
import { Employee } from '@src/models/Employee'
import EmployeeRepo from '@src/repos/EmployeeRepo'
import bcrypt from 'bcrypt'

export const EMPLOYEE_NOT_FOUND_ERR = 'Employee not found'

const getAll = () => {
  return EmployeeRepo.getAll()
}

const addOne = (employee: Employee) => {
  employee.password = bcrypt.hashSync(employee.password, Number(EnvVars.Salt))
  return EmployeeRepo.add(employee)
}

const updateOne = async (id: number, data: Partial<Employee>) => {
  const persists = await EmployeeRepo.persists(id)
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, EMPLOYEE_NOT_FOUND_ERR)
  }
  if ('password' in data && typeof data.password === 'string')
    data.password = bcrypt.hashSync(data.password, Number(EnvVars.Salt))
  const updatedEmployee = await EmployeeRepo.update(id, data)
  return updatedEmployee
}

const _delete = async (id: number) => {
  const persists = await EmployeeRepo.persists(id)
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, EMPLOYEE_NOT_FOUND_ERR)
  }
  return EmployeeRepo.delete_(id)
}

export default {
  getAll,
  addOne,
  updateOne,
  delete: _delete,
} as const
