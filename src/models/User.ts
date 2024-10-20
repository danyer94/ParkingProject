// import moment from 'moment'

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

export interface IPublicUser extends IUser {
  name: string
  email: string
  phoneNumber: string
  role: UserType
}

function new_(
  name?: string,
  email?: string,
  phoneNumber?: string,
  userType?: UserType,
  permissions?: string,
  created?: Date,
  id?: number // id last cause usually set by db
): IUser {
  return {
    id: id ?? -1,
    name: name ?? '',
    email: email ?? '',
    phoneNumber: phoneNumber ?? '',
    role: userType ?? UserType.ADMIN,
    permissions: permissions ?? '',
    created: created ? new Date(created) : new Date(),
  }
}

function from(param: object): IUser {
  if (isUser(param)) {
    const { name, email, phoneNumber, role, permissions, created, id } = param
    return new_(name, email, phoneNumber, role, permissions, created, id)
  }
  throw new Error(INVALID_CONSTRUCTOR_PARAM)
}

function isUser(arg: unknown): arg is IUser {
  const isArgValid = !!arg && typeof arg === 'object'
  const hasValidId = isArgValid && 'id' in arg && typeof arg.id === 'number'
  const hasValidName = isArgValid && 'name' in arg && typeof arg.name === 'string'
  const hasValidEmail = isArgValid && 'email' in arg && typeof arg.email === 'string'
  const hasValidPhoneNumber = isArgValid && 'phoneNumber' in arg && typeof arg.phoneNumber === 'string'
  const hasValidRole = isArgValid && 'role' in arg && Object.values(UserType).includes(arg.role as UserType)
  const hasValidPermissions = isArgValid && 'permissions' in arg && typeof arg.permissions === 'string'
  // const hasValidCreated = isArgValid && 'created' in arg && moment(arg.created as string | Date).isValid()

  const result =
    isArgValid &&
    hasValidId &&
    hasValidName &&
    hasValidEmail &&
    hasValidPhoneNumber &&
    hasValidRole &&
    hasValidPermissions /*&&
    hasValidCreated*/

  return result
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
      ('permissions' in arg && typeof arg.permissions === 'string')) /*||
      ('created' in arg && moment(arg.created as string | Date).isValid())*/
  )
}

export default {
  new: new_,
  from,
  isUser,
  isPartialUser,
} as const
