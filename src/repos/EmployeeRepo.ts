import { employeesTable } from '@src/db/schema'
import { Employee } from '@src/models/Employee'
import { getDatabase } from './BaseRepo'
import { eq } from 'drizzle-orm'

class EmployeeRepo {
  static getById = async (id: number) => {
    try {
      const db = await getDatabase()
      const employee = await db.query.employeesTable.findFirst({ with: { id } })
      return employee as Employee
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }

  static persists = async (id: number): Promise<boolean> => {
    try {
      const employee = await this.getById(id)
      return !!employee
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }

  static getAll = async () => {
    try {
      const db = await getDatabase()
      const empmloyees = await db.select().from(employeesTable)
      return empmloyees as Employee[]
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }

  static getByFilter = async (filter: Partial<Employee>): Promise<Employee[]> => {
    try {
      const db = await getDatabase()
      const employees = await db.query.employeesTable.findMany({ with: filter }) // Apply the filter
      return employees as Employee[]
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }

  static add = async (employee: Employee) => {
    try {
      const db = await getDatabase()
      const employeeEntity: typeof employeesTable.$inferInsert = { ...employee }
      const addedEmployee = await db.insert(employeesTable).values(employeeEntity)
      return addedEmployee as unknown as Employee
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }

  static update = async (id: number, data: Partial<Employee>) => {
    try {
      const db = await getDatabase()
      const updatedEmployee = await db.update(employeesTable).set(data).where(eq(employeesTable.id, id))
      return updatedEmployee as unknown as Employee
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }

  static delete_ = async (id: number) => {
    try {
      const db = await getDatabase()
      await db.delete(employeesTable).where(eq(employeesTable.id, id))
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }
}

export default EmployeeRepo
