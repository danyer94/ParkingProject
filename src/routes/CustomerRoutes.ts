import CustomerService from '@src/services/CustomerService'
import { IReq, IRes } from './common/types'
import HttpStatusCodes from '@src/common/HttpStatusCodes'
import check from './common/check'
import Customer from '@src/models/Customer'
import Authorization from '@src/util/Authorization'
import { UserType } from '@src/models/User'

const getAll = async (req: IReq, res: IRes) => {
  if (!Authorization.isAuthorized(req, res, [UserType.ADMIN])) return
  const customers = await CustomerService.getAll()
  const publicCustomers = customers.map(customer => Customer.ObtainPublicCustomer(customer))
  res.status(HttpStatusCodes.OK).json({ customers: publicCustomers })
}

const add = async (req: IReq, res: IRes) => {
  if (!Authorization.isAuthorized(req, res, [UserType.ADMIN])) return
  const customer = check.isValid(req.body, 'customer', Customer.isCustomer)
  await CustomerService.addOne(customer)
  res.status(HttpStatusCodes.CREATED).end()
}

const update = async (req: IReq, res: IRes) => {
  if (!Authorization.isAuthorized(req, res, [UserType.ADMIN])) return
  const id = Number(req.params.id)
  const customer = check.isValid(req.body, 'customer', Customer.isPartialCustomer)
  await CustomerService.updateOne(id, customer)
  res.status(HttpStatusCodes.OK).end()
}

const delete_ = async (req: IReq, res: IRes) => {
  if (!Authorization.isAuthorized(req, res, [UserType.ADMIN])) return
  const id = Number(req.params.id)
  await CustomerService.delete(id)
  res.status(HttpStatusCodes.OK).end()
}

export default {
  getAll,
  add,
  update,
  delete: delete_,
}
