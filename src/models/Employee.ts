import User, { IUser } from './User'

export interface Employee extends IUser {
  password: string
  address?: string
}

const isEmployee = (arg: unknown): arg is Employee => {
  return (
    !!arg &&
    User.isUser(arg) &&
    typeof arg === 'object' &&
    'password' in arg &&
    ('address' in arg ? typeof arg.address === 'string' : false)
  )
}

const isPartialEmployee = (arg: unknown): arg is Partial<Employee> => {
  return (
    !!arg &&
    typeof arg === 'object' &&
    (User.isPartialUser(arg) ||
      ('password' in arg && typeof arg.password === 'string') ||
      ('address' in arg ? typeof arg.address === 'string' : false))
  )
}

export default {
  isEmployee,
  isPartialEmployee,
}
