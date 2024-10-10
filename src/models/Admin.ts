import { IUser } from "./User";

export interface Admin extends IUser {
  password: string
  address?: string
}