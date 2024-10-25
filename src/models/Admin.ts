import User, { IPublicUser, IUser } from './User'

export interface Admin extends IUser {
  password: string
  address?: string
}

export interface PublicAdmin extends IPublicUser {
  address?: string
}

const isAdmin = (arg: unknown): arg is Admin => {
  return (
    !!arg &&
    typeof arg === 'object' &&
    User.isUser(arg) &&
    'password' in arg &&
    typeof arg.password === 'string' &&
    ('address' in arg ? typeof arg.address === 'string' : true)
  )
}

const isPartialAdmin = (arg: unknown): arg is Partial<Admin> => {
  return (
    !!arg &&
    typeof arg === 'object' &&
    User.isPartialUser(arg) &&
    ('password' in arg ? typeof arg.password === 'string' : true) &&
    ('address' in arg ? typeof arg.address === 'string' : true)
  )
}

const ObtainPublicAdmin = (admin: Admin): PublicAdmin => {
  const publicAdmin: PublicAdmin = { ...User.ObtainPublicUser(admin), address: admin.address }
  return publicAdmin
}

export default {
  isAdmin,
  isPartialAdmin,
  ObtainPublicAdmin,
}
