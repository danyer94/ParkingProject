import EnvVars from '@src/common/EnvVars'
import { IReq, IRes, UserSession } from '@src/routes/common/types'
import { NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const userExtractionMiddleware = (req: IReq, res: IRes, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  // if (!token) res.status(HttpStatusCodes.UNAUTHORIZED).json({ message: 'No token provided' })
  if (token) {
    let data
    try {
      data = jwt.verify(token, EnvVars.Jwt.Secret) as jwt.JwtPayload
      const { exp, iat, ...user } = data
      req.session = { user: user as UserSession }
    } catch (error) {
      console.log({ error })
    }
  }
  next()
}
