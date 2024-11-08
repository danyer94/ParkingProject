import EnvVars from '@src/common/EnvVars'
import HttpStatusCodes from '@src/common/HttpStatusCodes'
import { RouteError } from '@src/common/classes'
import { Admin } from '@src/models/Admin'
import { IEmployee } from '@src/models/Employee'
import AdminRepo from '@src/repos/AdminRepo'
import CustomerRepo from '@src/repos/CustomerRepo'
import EmployeeRepo from '@src/repos/EmployeeRepo'
import bcrypt from 'bcrypt'

const adminSignup = async (admin: Admin) => {
  const adminExist = await AdminRepo.getByUsername(admin.username)
  if (adminExist) {
    throw new RouteError(HttpStatusCodes.CONFLICT, 'Username already exists')
  }
  admin.password = bcrypt.hashSync(admin.password, Number(EnvVars.Salt))
  return AdminRepo.add(admin)
}

const customerLogin = async (username: string, password: string) => {
  const customer = await CustomerRepo.getByUsername(username)
  if (!customer) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Customer not found')
  }
  const isValidPassword = bcrypt.compareSync(password, customer.password)
  if (!isValidPassword) {
    throw new RouteError(HttpStatusCodes.UNAUTHORIZED, 'Invalid username or password')
  }
  return customer
}

const adminEmployeeLogin = async (username: string, password: string): Promise<Admin | IEmployee> => {
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
  adminSignup,
}
