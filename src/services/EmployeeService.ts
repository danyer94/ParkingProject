import { RouteError } from '@src/common/classes'
import HttpStatusCodes from '@src/common/HttpStatusCodes'
import { Employee } from '@src/models/Employee'
import EmployeeRepo from '@src/repos/EmployeeRepo'

export const EMPLOYEE_NOT_FOUND_ERR = 'Employee not found'

const getAll = () => {
  return EmployeeRepo.getAll()
}

const addOne = (employee: Employee) => {
  return EmployeeRepo.add(employee)
}

const updateOne = async (id: number, data: Partial<Employee>) => {
  const persists = await EmployeeRepo.persists(id)
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, EMPLOYEE_NOT_FOUND_ERR)
  }
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
