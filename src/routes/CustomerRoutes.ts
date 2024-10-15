import CustomerService from '@src/services/CustomerService'
import { IReq, IRes } from './common/types'
import HttpStatusCodes from '@src/common/HttpStatusCodes'
import check from './common/check'
import Customer from '@src/models/Customer'

const getAll = async (_: IReq, res: IRes) => {
  const customers = await CustomerService.getAll()
  res.status(HttpStatusCodes.OK).json({ customers })
}

const add = async (req: IReq, res: IRes) => {
  const customer = check.isValid(req.body, 'customer', Customer.isCustomer)
  await CustomerService.addOne(customer)
  res.status(HttpStatusCodes.CREATED).end()
}

const update = async (req: IReq, res: IRes) => {
  const id = Number(req.params.id)
  const customer = check.isValid(req.body, 'customer', Customer.isPartialCustomer)
  await CustomerService.updateOne(id, customer)
  res.status(HttpStatusCodes.OK).end()
}

const delete_ = async (req: IReq, res: IRes) => {
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
