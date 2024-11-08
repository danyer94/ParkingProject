import User, { IPublicUser, IUser } from './User'

export interface IEmployee extends IUser {
  password: string
  address?: string
}

export interface PublicEmployee extends IPublicUser {
  address?: string
}

const isEmployee = (arg: unknown): arg is IEmployee => {
  return (
    !!arg &&
    User.isUser(arg) &&
    typeof arg === 'object' &&
    'password' in arg &&
    typeof arg.password === 'string' &&
    ('address' in arg ? typeof arg.address === 'string' : true)
  )
}

const isPartialEmployee = (arg: unknown): arg is Partial<IEmployee> => {
  return (
    !!arg &&
    typeof arg === 'object' &&
    User.isPartialUser(arg) &&
    ('password' in arg ? typeof arg.password === 'string' : true) &&
    ('address' in arg ? typeof arg.address === 'string' : true)
  )
}

const ObtainPublicEmployee = (employee: IEmployee): PublicEmployee => {
  const publicEmployee: PublicEmployee = { ...User.ObtainPublicUser(employee), address: employee.address }
  return publicEmployee
}

export default {
  isEmployee,
  isPartialEmployee,
  ObtainPublicEmployee,
}
