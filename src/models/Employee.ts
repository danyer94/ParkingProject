import { IUser } from './User'

export interface Employee extends IUser {
  password: string
  address?: string
}
