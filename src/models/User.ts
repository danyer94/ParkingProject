import moment from 'moment'

// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 'with the appropriate user keys.'

// **** Types **** //

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

// **** Functions **** //

/**
 * Create new User.
 */
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

/**
 * Get user instance from object.
 */
function from(param: object): IUser {
  if (isUser(param)) {
    return new_(param.name, param.email, param.phoneNumber, param.role, param.permissions, param.created, param.id)
  }
  throw new Error(INVALID_CONSTRUCTOR_PARAM)
}

/**
 * See if the param meets criteria to be a user.
 */
function isUser(arg: unknown): arg is IUser {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'id' in arg &&
    typeof arg.id === 'number' &&
    'email' in arg &&
    typeof arg.email === 'string' &&
    'name' in arg &&
    typeof arg.name === 'string' &&
    'created' in arg &&
    moment(arg.created as string | Date).isValid()
  )
}

// **** Export default **** //

export default {
  new: new_,
  from,
  isUser,
} as const
