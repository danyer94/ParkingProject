import User, { IPublicUser, IUser } from './User'

export interface Employee extends IUser {
  password: string
  address?: string
}

export interface PublicEmployee extends IPublicUser {
  address?: string
}

const isEmployee = (arg: unknown): arg is Employee => {
  return (
    !!arg &&
    User.isUser(arg) &&
    typeof arg === 'object' &&
    'password' in arg &&
    typeof arg.password === 'string' &&
    ('address' in arg ? typeof arg.address === 'string' : true)
  )
}

const isPartialEmployee = (arg: unknown): arg is Partial<Employee> => {
  return (
    !!arg &&
    typeof arg === 'object' &&
    User.isPartialUser(arg) &&
    ('password' in arg ? typeof arg.password === 'string' : true) &&
    ('address' in arg ? typeof arg.address === 'string' : true)
  )
}

const ObtainPublicEmployee = (employee: Employee): PublicEmployee => {
  const publicEmployee: PublicEmployee = { ...User.ObtainPublicUser(employee), address: employee.address }
  return publicEmployee
}

export default {
  isEmployee,
  isPartialEmployee,
  ObtainPublicEmployee,
}
