import { RouteError } from '@src/common/classes'
import EnvVars from '@src/common/EnvVars'
import HttpStatusCodes from '@src/common/HttpStatusCodes'
import { Customer } from '@src/models/Customer'
import CustomerRepo from '@src/repos/CustomerRepo'
import bcrypt from 'bcrypt'

export const CUSTOMER_NOT_FOUND_ERR = 'Customer not found'

const getAll = () => {
  return CustomerRepo.getAll()
}

const addOne = (customer: Customer) => {
  customer.password = bcrypt.hashSync(customer.password, Number(EnvVars.Salt))
  return CustomerRepo.add(customer)
}

const updateOne = async (id: number, data: Partial<Customer>) => {
  const persists = await CustomerRepo.persists(id)
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, CUSTOMER_NOT_FOUND_ERR)
  }
  if ('password' in data && typeof data.password === 'string')
    data.password = bcrypt.hashSync(data.password, Number(EnvVars.Salt))
  const updatedCustomer = await CustomerRepo.update(id, data)
  return updatedCustomer
}

const _delete = async (id: number) => {
  const persists = await CustomerRepo.persists(id)
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, CUSTOMER_NOT_FOUND_ERR)
  }
  return CustomerRepo.delete_(id)
}

export default {
  getAll,
  addOne,
  updateOne,
  delete: _delete,
} as const
