import moment from 'moment'

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object with the appropriate user keys.'

export enum UserType {
  CUSTOMER = 'customer',
  EMPLOYEE = 'employee',
  ADMIN = 'admin',
}

export interface IUser {
  id: number
  name: string
  email: string
  phoneNumber: string
  role: UserType
  permissions: string
  created: Date
}

function new_(
  name: string = '',
  email: string = '',
  phoneNumber: string = '',
  userType: UserType = UserType.ADMIN,
  permissions: string = '',
  created: Date = new Date(),
  id: number = -1
): IUser {
  return { id, name, email, phoneNumber, role: userType, permissions, created }
}

function from(param: object): IUser {
  if (isUser(param)) {
    const { name, email, phoneNumber, role, permissions, created, id } = param
    return new_(name, email, phoneNumber, role, permissions, created, id)
  }
  throw new Error(INVALID_CONSTRUCTOR_PARAM)
}

function isUser(arg: unknown): arg is IUser {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'id' in arg &&
    typeof arg.id === 'number' &&
    'name' in arg &&
    typeof arg.name === 'string' &&
    'email' in arg &&
    typeof arg.email === 'string' &&
    'phoneNumber' in arg &&
    typeof arg.phoneNumber === 'string' &&
    'role' in arg &&
    Object.values(UserType).includes(arg.role as UserType) &&
    'permissions' in arg &&
    typeof arg.permissions === 'string' &&
    'created' in arg &&
    moment(arg.created as string | Date).isValid()
  )
}

const isPartialUser = (arg: unknown): arg is Partial<IUser> => {
  return (
    !!arg &&
    typeof arg === 'object' &&
    (('id' in arg && typeof arg.id === 'number') ||
      ('name' in arg && typeof arg.name === 'string') ||
      ('email' in arg && typeof arg.email === 'string') ||
      ('phoneNumber' in arg && typeof arg.phoneNumber === 'string') ||
      ('role' in arg && Object.values(UserType).includes(arg.role as UserType)) ||
      ('permissions' in arg && typeof arg.permissions === 'string') ||
      ('created' in arg && moment(arg.created as string | Date).isValid()))
  )
}

export default {
  new: new_,
  from,
  isUser,
  isPartialUser,
} as const
