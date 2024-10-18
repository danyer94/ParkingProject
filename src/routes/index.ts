import { Router } from 'express'

import Paths from '../common/Paths'
import UserRoutes from './UserRoutes'
import AdminRoutes from './AdminRoutes'
import EmployeeRoutes from './EmployeeRoutes'
import CustomerRoutes from './CustomerRoutes'
import VehicleRoutes from './VehicleRoutes'
import ParkingSpotRoutes from './ParkingSpotRoutes'
import ReservationRoutes from './ReservationRoutes'

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

adminRouter.get(Paths.Admins.Get, AdminRoutes.getAll)
adminRouter.post(Paths.Admins.Add, AdminRoutes.add)
adminRouter.put(Paths.Admins.Update, AdminRoutes.update)
adminRouter.delete(Paths.Admins.Delete, AdminRoutes.delete)

employeeRouter.get(Paths.Emplployees.Get, EmployeeRoutes.getAll)
employeeRouter.post(Paths.Emplployees.Add, EmployeeRoutes.add)
employeeRouter.put(Paths.Emplployees.Update, EmployeeRoutes.update)
employeeRouter.delete(Paths.Emplployees.Delete, EmployeeRoutes.delete)

customerRouter.get(Paths.Customers.Get, CustomerRoutes.getAll)
customerRouter.post(Paths.Customers.Add, CustomerRoutes.add)
customerRouter.put(Paths.Customers.Update, CustomerRoutes.update)
customerRouter.delete(Paths.Customers.Delete, CustomerRoutes.delete)

vehicleRouter.get(Paths.Vehicles.Get, VehicleRoutes.getAll)
vehicleRouter.post(Paths.Vehicles.Add, VehicleRoutes.add)
vehicleRouter.put(Paths.Vehicles.Update, VehicleRoutes.update)
vehicleRouter.delete(Paths.Vehicles.Delete, VehicleRoutes.delete)

parkingSpotRouter.get(Paths.ParkingSpots.Get, ParkingSpotRoutes.getAll)
parkingSpotRouter.post(Paths.ParkingSpots.Add, ParkingSpotRoutes.add)
parkingSpotRouter.put(Paths.ParkingSpots.Update, ParkingSpotRoutes.update)
parkingSpotRouter.delete(Paths.ParkingSpots.Delete, ParkingSpotRoutes.delete)

const reservationRouter = Router()

reservationRouter.get(Paths.Reservations.Get, ReservationRoutes.getAll)
reservationRouter.post(Paths.Reservations.Add, ReservationRoutes.add)
reservationRouter.put(Paths.Reservations.Update, ReservationRoutes.update)
reservationRouter.delete(Paths.Reservations.Delete, ReservationRoutes.delete)
reservationRouter.post(Paths.Reservations.Reserve, ReservationRoutes.reserve)

apiRouter.use(Paths.Reservations.Base, reservationRouter)

// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter)
apiRouter.use(Paths.Admins.Base, adminRouter)
apiRouter.use(Paths.Customers.Base, customerRouter)
apiRouter.use(Paths.Vehicles.Base, vehicleRouter)
apiRouter.use(Paths.ParkingSpots.Base, parkingSpotRouter)
apiRouter.use(Paths.Reservations.Base, reservationRouter)

// **** Export default **** //

export default apiRouter
