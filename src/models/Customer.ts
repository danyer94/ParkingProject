import { IUser } from './User'

export interface Customer extends IUser {
  address?: string
}
