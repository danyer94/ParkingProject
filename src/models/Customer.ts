import User, { IPublicUser, IUser } from './User'

export interface Customer extends IUser {
  address?: string
}

export interface PublicCustomer extends IPublicUser {
  address?: string
}

const isCustomer = (arg: unknown): arg is Customer => {
  return (
    !!arg && User.isUser(arg) && typeof arg === 'object' && ('address' in arg ? typeof arg.address === 'string' : true)
  )
}

const isPartialCustomer = (arg: unknown): arg is Partial<Customer> => {
  return (
    !!arg &&
    typeof arg === 'object' &&
    (User.isPartialUser(arg) || ('address' in arg ? typeof arg.address === 'string' : false))
  )
}

export default {
  isCustomer,
  isPartialCustomer,
}
