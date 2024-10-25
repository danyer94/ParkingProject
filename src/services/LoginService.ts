import HttpStatusCodes from '@src/common/HttpStatusCodes'
import { RouteError } from '@src/common/classes'
import { Admin } from '@src/models/Admin'
import { Employee } from '@src/models/Employee'
import AdminRepo from '@src/repos/AdminRepo'
import CustomerRepo from '@src/repos/CustomerRepo'
import EmployeeRepo from '@src/repos/EmployeeRepo'
import bcrypt from 'bcrypt'

const customerLogin = async (username: string, password: string) => {
  const customer = await CustomerRepo.getByUsername(username)
  if (!customer) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Customer not found')
  }
  const isValidPassword = bcrypt.compareSync(password, customer.password)
  if (!isValidPassword) {
    throw new RouteError(HttpStatusCodes.UNAUTHORIZED, 'Invalid username or password')
  }
  if (customer.password !== password) {
    throw new RouteError(HttpStatusCodes.UNAUTHORIZED, 'Invalid username or password')
  }
  // const token = await TokenService.generateToken(user)
  return customer
}

const adminEmployeeLogin = async (username: string, password: string): Promise<Admin | Employee> => {
  const admin = await AdminRepo.getByUsername(username)
  if (!admin) {
    const employee = await EmployeeRepo.getByUsername(username)
    if (!employee) {
      throw new RouteError(HttpStatusCodes.NOT_FOUND, 'User not found')
    }
    const isValidPassword = bcrypt.compareSync(password, employee.password)
    if (!isValidPassword) {
      throw new RouteError(HttpStatusCodes.UNAUTHORIZED, 'Invalid username or password')
    }
    return employee
  }
  const isValidPassword = bcrypt.compareSync(password, admin.password)
  if (!isValidPassword) {
    throw new RouteError(HttpStatusCodes.UNAUTHORIZED, 'Invalid username or password')
  }
  return admin
}

export default {
  adminEmployeeLogin,
  customerLogin,
}
