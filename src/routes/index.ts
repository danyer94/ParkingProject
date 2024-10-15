import { Router } from 'express'

import Paths from '../common/Paths'
import UserRoutes from './UserRoutes'

// **** Variables **** //

const apiRouter = Router()

// ** Add UserRouter ** //

// Init router
const userRouter = Router()
const adminRouter = Router()
const employeeRouter = Router()
const customerRouter = Router()
const vehicleRouter = Router()
const parkingSpotRouter = Router()

// Get all users
userRouter.get(Paths.Users.Get, UserRoutes.getAll)
userRouter.post(Paths.Users.Add, UserRoutes.add)
userRouter.put(Paths.Users.Update, UserRoutes.update)
userRouter.delete(Paths.Users.Delete, UserRoutes.delete)

adminRouter.get(Paths.Admins.Get, UserRoutes.getAll)
adminRouter.post(Paths.Admins.Add, UserRoutes.add)
adminRouter.put(Paths.Admins.Update, UserRoutes.update)
adminRouter.delete(Paths.Admins.Delete, UserRoutes.delete)

employeeRouter.get(Paths.Emplployees.Get, UserRoutes.getAll)
employeeRouter.post(Paths.Emplployees.Add, UserRoutes.add)
employeeRouter.put(Paths.Emplployees.Update, UserRoutes.update)
employeeRouter.delete(Paths.Emplployees.Delete, UserRoutes.delete)

customerRouter.get(Paths.Customers.Get, UserRoutes.getAll)
customerRouter.post(Paths.Customers.Add, UserRoutes.add)
customerRouter.put(Paths.Customers.Update, UserRoutes.update)
customerRouter.delete(Paths.Customers.Delete, UserRoutes.delete)

vehicleRouter.get(Paths.Vehicles.Get, UserRoutes.getAll)
vehicleRouter.post(Paths.Vehicles.Add, UserRoutes.add)
vehicleRouter.put(Paths.Vehicles.Update, UserRoutes.update)
vehicleRouter.delete(Paths.Vehicles.Delete, UserRoutes.delete)

parkingSpotRouter.get(Paths.ParkingSpots.Get, UserRoutes.getAll)
parkingSpotRouter.post(Paths.ParkingSpots.Add, UserRoutes.add)
parkingSpotRouter.put(Paths.ParkingSpots.Update, UserRoutes.update)
parkingSpotRouter.delete(Paths.ParkingSpots.Delete, UserRoutes.delete)

// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter)
apiRouter.use(Paths.Admins.Base, adminRouter)
apiRouter.use(Paths.Customers.Base, customerRouter)
apiRouter.use(Paths.Vehicles.Base, vehicleRouter)
apiRouter.use(Paths.ParkingSpots.Base, parkingSpotRouter)

// **** Export default **** //

export default apiRouter
