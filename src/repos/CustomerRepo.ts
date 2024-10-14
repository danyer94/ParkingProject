import { customersTable } from '@src/db/schema'
import { Customer } from '@src/models/Customer'
import { getDatabase } from './RepoUtils'
import { eq } from 'drizzle-orm'

class CustomerRepo {
  static getById = async (id: number): Promise<Customer> => {
    try {
      const db = await getDatabase()
      const customer = await db.query.customersTable.findFirst({ with: { id } })
      return customer as unknown as Customer
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }

  static persists = async (id: number): Promise<boolean> => {
    try {
      const customer = await this.getById(id)
      return !!customer
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }

  static getAll = async (): Promise<Customer[]> => {
    try {
      const db = await getDatabase()
      const customers = await db.select().from(customersTable)
      return customers as unknown[] as Customer[]
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }

  static getByFilter = async (filter: Partial<Customer>): Promise<Customer[]> => {
    try {
      const db = await getDatabase()
      const items = await db.query.customersTable.findMany({ with: filter })
      return items
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }

  static add = async (customer: Customer): Promise<Customer> => {
    try {
      const db = await getDatabase()
      const customerEntity: typeof customersTable.$inferInsert = { ...customer }
      const result = await db.insert(customersTable).values(customerEntity)
      return result as unknown as Customer
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }

  static update = async (id: number, data: Partial<Customer>) => {
    try {
      const db = await getDatabase()
      const result = await db.update(customersTable).set(data).where(eq(customersTable.id, id))
      return result as unknown as Customer
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }

  static delete_ = async (id: number) => {
    try {
      const db = await getDatabase()
      await db.delete(customersTable).where(eq(customersTable.id, id))
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }
}

export default CustomerRepo
