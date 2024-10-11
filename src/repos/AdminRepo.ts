import { adminsTable } from '@src/db/schema'
import { Admin } from '@src/models/Admin'
import { getDatabase } from './BaseRepo'
import { eq } from 'drizzle-orm'

class AdminRepo {
  static getById = async (id: number): Promise<Admin> => {
    try {
      const db = await getDatabase()
      const admin = await db.query.adminsTable.findFirst({ with: { id } })
      return admin as unknown as Admin
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }

  static persists = async (id: number): Promise<boolean> => {
    try {
      const admin = await this.getById(id)
      return !!admin
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }

  static getAll = async (): Promise<Admin[]> => {
    try {
      const db = await getDatabase()
      const admins = await db.select().from(adminsTable)
      return admins as unknown[] as Admin[]
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }

  static getByFilter = async (filter: Partial<Admin>): Promise<Admin[]> => {
    try {
      const db = await getDatabase()
      const items = await db.query.adminsTable.findMany({ with: filter })
      return items
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }

  static add = async (admin: Admin): Promise<Admin> => {
    try {
      const db = await getDatabase()
      const adminEntity: typeof adminsTable.$inferInsert = { ...admin }
      const result = await db.insert(adminsTable).values(adminEntity)
      return result as unknown as Admin
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }

  static update = async (id: number, data: Partial<Admin>) => {
    try {
      const db = await getDatabase()
      const result = await db.update(adminsTable).set(data).where(eq(adminsTable.id, id))
      return result as unknown as Admin
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }

  static delete_ = async (id: number) => {
    try {
      const db = await getDatabase()
      await db.delete(adminsTable).where(eq(adminsTable.id, id))
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }
}

export default AdminRepo
