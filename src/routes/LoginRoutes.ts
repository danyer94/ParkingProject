import { IReq, IRes } from '@src/routes/common/types'
import HttpStatusCodes from '@src/common/HttpStatusCodes'
import { RouteError } from '@src/common/classes'
import LoginService from '@src/services/LoginService'
import jwt from 'jsonwebtoken'
import EnvVars from '@src/common/EnvVars'
import Customer, { PublicCustomer } from '@src/models/Customer'
import Employee from '@src/models/Employee'
import Admin, { PublicAdmin } from '@src/models/Admin'
import check from './common/check'

const adminSignup = async (req: IReq, res: IRes) => {
  const admin = check.isValid(req.body, 'admin', Admin.isAdmin)
  try {
    await LoginService.adminSignup(admin)
    const token = jwt.sign({ id: admin.id, username: admin.username, role: admin.role }, EnvVars.Jwt.Secret, {
      expiresIn: EnvVars.Jwt.Exp,
    })
    const publicAdmin: PublicAdmin = Admin.ObtainPublicAdmin(admin)
    res
      .cookie('access_token', token, EnvVars.CookieProps.Options)
      .status(HttpStatusCodes.CREATED)
      .json({ publicAdmin, token })
  } catch (error) {
    if (error instanceof RouteError) {
      res.status(error.status).json({ message: error.message })
    } else {
      res.status
    }
  }
}

const customerLogin = async (req: IReq, res: IRes) => {
  const { username, password } = req.body
  try {
    const customer = await LoginService.customerLogin(String(username), String(password))
    const token = jwt.sign({ id: customer.id, username: customer.username, role: customer.role }, EnvVars.Jwt.Secret, {
      expiresIn: EnvVars.Jwt.Exp,
    })
    const publicCustomer: PublicCustomer = Customer.ObtainPublicCustomer(customer)
    res
      .cookie('access_token', token, EnvVars.CookieProps.Options)
      .status(HttpStatusCodes.OK)
      .json({ publicCustomer, token })
  } catch (error) {
    if (error instanceof RouteError) {
      res.status(error.status).json({ message: error.message })
    }
  }
}

const adminEmployeeLogin = async (req: IReq, res: IRes) => {
  const { username, password } = req.body
  try {
    const adminOrEmployee = await LoginService.adminEmployeeLogin(String(username), String(password))
    const token = jwt.sign(
      { id: adminOrEmployee.id, username: adminOrEmployee.username, role: adminOrEmployee.role },
      EnvVars.Jwt.Secret,
      {
        expiresIn: EnvVars.Jwt.Exp,
      }
    )
    const isAdmin = Admin.isAdmin(adminOrEmployee)
    const publicAdminOrEmployee = isAdmin
      ? Admin.ObtainPublicAdmin(adminOrEmployee)
      : Employee.ObtainPublicEmployee(adminOrEmployee)
    res
      .cookie('access_token', token, EnvVars.CookieProps.Options)
      .status(HttpStatusCodes.OK)
      .json({ user: publicAdminOrEmployee, token })
  } catch (error) {
    if (error instanceof RouteError) {
      res.status(error.status).json({ message: error.message })
    }
  }
}

export default {
  customerLogin,
  adminEmployeeLogin,
  adminSignup,
}
