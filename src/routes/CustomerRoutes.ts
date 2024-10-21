import CustomerService from '@src/services/CustomerService'
import { IReq, IRes } from './common/types'
import HttpStatusCodes from '@src/common/HttpStatusCodes'
import check from './common/check'
import Customer from '@src/models/Customer'
import Authorization from '@src/util/Authorization'

const getAll = async (req: IReq, res: IRes) => {
  if (!Authorization.isAdmin(req, res)) return
  const customers = await CustomerService.getAll()
  res.status(HttpStatusCodes.OK).json({ customers })
}

const add = async (req: IReq, res: IRes) => {
  if (!Authorization.isAdmin(req, res)) return
  const customer = check.isValid(req.body, 'customer', Customer.isCustomer)
  await CustomerService.addOne(customer)
  res.status(HttpStatusCodes.CREATED).end()
}

const update = async (req: IReq, res: IRes) => {
  if (!Authorization.isAdmin(req, res)) return
  const id = Number(req.params.id)
  const customer = check.isValid(req.body, 'customer', Customer.isPartialCustomer)
  await CustomerService.updateOne(id, customer)
  res.status(HttpStatusCodes.OK).end()
}

const delete_ = async (req: IReq, res: IRes) => {
  if (!Authorization.isAdmin(req, res)) return
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
