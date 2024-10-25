import { Router } from 'express'

import Paths from '../common/Paths'
import UserRoutes from './UserRoutes'
import AdminRoutes from './AdminRoutes'
import EmployeeRoutes from './EmployeeRoutes'
import CustomerRoutes from './CustomerRoutes'
import VehicleRoutes from './VehicleRoutes'
import ParkingSpotRoutes from './ParkingSpotRoutes'
import ReservationRoutes from './ReservationRoutes'
import LoginRoutes from './LoginRoutes'
import ActivityLogRoutes from './ActivityLogRoutes'

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
const reservationRouter = Router()
const loginRouter = Router()
const signupRouter = Router()
const activityLogRouter = Router()

// Get all users
userRouter.get(Paths.Users.Get, UserRoutes.getAll)
userRouter.post(Paths.Users.Add, UserRoutes.add)
userRouter.put(Paths.Users.Update, UserRoutes.update)
userRouter.delete(Paths.Users.Delete, UserRoutes.delete)

//Admins routes
adminRouter.get(Paths.Admins.Get, AdminRoutes.getAll)
adminRouter.post(Paths.Admins.Add, AdminRoutes.add)
adminRouter.patch(Paths.Admins.Update, AdminRoutes.update)
adminRouter.delete(Paths.Admins.Delete, AdminRoutes.delete)

//Employees routes
employeeRouter.get(Paths.Employees.Get, EmployeeRoutes.getAll)
employeeRouter.post(Paths.Employees.Add, EmployeeRoutes.add)
employeeRouter.patch(Paths.Employees.Update, EmployeeRoutes.update)
employeeRouter.delete(Paths.Employees.Delete, EmployeeRoutes.delete)

//Customers routes
customerRouter.get(Paths.Customers.Get, CustomerRoutes.getAll)
customerRouter.post(Paths.Customers.Add, CustomerRoutes.add)
customerRouter.patch(Paths.Customers.Update, CustomerRoutes.update)
customerRouter.delete(Paths.Customers.Delete, CustomerRoutes.delete)

//Vehicles routes
vehicleRouter.get(Paths.Vehicles.Get, VehicleRoutes.getAll)
vehicleRouter.post(Paths.Vehicles.Add, VehicleRoutes.add)
vehicleRouter.patch(Paths.Vehicles.Update, VehicleRoutes.update)
vehicleRouter.delete(Paths.Vehicles.Delete, VehicleRoutes.delete)

//Parking Spots routes
parkingSpotRouter.get(Paths.ParkingSpots.Get, ParkingSpotRoutes.getAll)
parkingSpotRouter.post(Paths.ParkingSpots.Add, ParkingSpotRoutes.add)
parkingSpotRouter.patch(Paths.ParkingSpots.Update, ParkingSpotRoutes.update)
parkingSpotRouter.delete(Paths.ParkingSpots.Delete, ParkingSpotRoutes.delete)
parkingSpotRouter.post(Paths.ParkingSpots.OccupationDetails, ParkingSpotRoutes.getParkingOccupationDetails)

//Reservations routes
reservationRouter.get(Paths.Reservations.Get, ReservationRoutes.getAll)
reservationRouter.post(Paths.Reservations.Add, ReservationRoutes.add)
reservationRouter.patch(Paths.Reservations.Update, ReservationRoutes.update)
reservationRouter.delete(Paths.Reservations.Delete, ReservationRoutes.delete)
reservationRouter.post(Paths.Reservations.Reserve, ReservationRoutes.reserve)

//Login routes
loginRouter.post(Paths.Login.Public, LoginRoutes.customerLogin)
loginRouter.post(Paths.Login.Private, LoginRoutes.adminEmployeeLogin)

//Signup routes
signupRouter.post(Paths.Signup.Private, LoginRoutes.adminSignup)

//ActivityLogRoutes
activityLogRouter.get(Paths.ActivityLogs.Get, ActivityLogRoutes.getAll)
activityLogRouter.post(Paths.ActivityLogs.Add, ActivityLogRoutes.add)
activityLogRouter.patch(Paths.ActivityLogs.Update, ActivityLogRoutes.update)
activityLogRouter.delete(Paths.ActivityLogs.Delete, ActivityLogRoutes.delete)

apiRouter.use(Paths.Users.Base, userRouter)
apiRouter.use(Paths.Admins.Base, adminRouter)
apiRouter.use(Paths.Employees.Base, employeeRouter)
apiRouter.use(Paths.Customers.Base, customerRouter)
apiRouter.use(Paths.Vehicles.Base, vehicleRouter)
apiRouter.use(Paths.ParkingSpots.Base, parkingSpotRouter)
apiRouter.use(Paths.Reservations.Base, reservationRouter)
apiRouter.use(Paths.Login.Base, loginRouter)
apiRouter.use(Paths.Signup.Base, signupRouter)
apiRouter.use(Paths.ActivityLogs.Base, activityLogRouter)

// **** Export default **** //

export default apiRouter
