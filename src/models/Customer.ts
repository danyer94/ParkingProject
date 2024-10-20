import User, { IPublicUser, IUser } from './User'

export interface Customer extends IUser {
  password: string
  address?: string
}

export interface PublicCustomer extends IPublicUser {
  address?: string
}

const isCustomer = (arg: unknown): arg is Customer => {
  return (
    !!arg &&
    User.isUser(arg) &&
    typeof arg === 'object' &&
    'password' in arg &&
    ('address' in arg ? typeof arg.address === 'string' : true)
  )
}

const isPartialCustomer = (arg: unknown): arg is Partial<Customer> => {
  return (
    !!arg &&
    typeof arg === 'object' &&
    (User.isPartialUser(arg) ||
      ('password' in arg && typeof arg.password === 'string') ||
      ('address' in arg ? typeof arg.address === 'string' : false))
  )
}

const ObtainPublicCustomer = (customer: Customer): PublicCustomer => {
  const publicCustomer: PublicCustomer = { ...User.ObtainPublicUser(customer), address: customer.address }
  return publicCustomer
}

export default {
  isCustomer,
  isPartialCustomer,
  ObtainPublicCustomer,
}
