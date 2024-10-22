import { UserType } from '@src/models/User'
import { Response, Request } from 'express'

// **** Express **** //

type TObj = Record<string, unknown>
// export type IReq = Request<TObj, void, TObj, TObj>
export type IRes = Response<unknown, TObj>

//***** Custom Types ****//
export interface IReq extends Request {
  session?: {
    user?: UserSession
  }
}

export type UserSession = {
  id: number
  username: string
  role: UserType
}
