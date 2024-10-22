import HttpStatusCodes from '@src/common/HttpStatusCodes'
import { UserType } from '@src/models/User'
import { IReq, IRes, UserSession } from '@src/routes/common/types'

const isAdmin = (req: IReq, res: IRes) => {
  const session = (req.body as any).session
  if (!session?.user?.role || session?.user?.role !== UserType.ADMIN) {
    res.status(HttpStatusCodes.UNAUTHORIZED).send('Unauthorized')
    return false
  }
  return true
}

const isEmployee = (req: IReq, res: IRes) => {
  const session = (req.body as any).session
  if (!session?.user?.role || session?.user?.role !== UserType.EMPLOYEE) {
    res.status(HttpStatusCodes.UNAUTHORIZED).send('Unauthorized')
    return false
  }
  return true
}

const isCustomer = (req: IReq, res: IRes) => {
  const session = (req.body as any).session
  if (!session?.user?.role || session?.user?.role !== UserType.CUSTOMER) {
    res.status(HttpStatusCodes.UNAUTHORIZED).send('Unauthorized')
    return false
  }
  return true
}

const isAuthorized = (req: IReq, res: IRes, authorizedUsersType: UserType[]) => {
  const session = req.session
  if (!session?.user?.role || !authorizedUsersType.includes(session?.user?.role)) {
    res.status(HttpStatusCodes.UNAUTHORIZED).send('Unauthorized')
    return false
  }
  return true
}

export default {
  isAdmin,
  isEmployee,
  isCustomer,
  isAuthorized,
}
