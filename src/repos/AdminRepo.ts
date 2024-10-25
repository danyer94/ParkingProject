import { adminsTable } from '@src/db/schema'
import { Admin } from '@src/models/Admin'
import { getDatabase } from './RepoUtils'
import { eq } from 'drizzle-orm'

const getById = async (id: number): Promise<Admin> => {
  try {
    const db = getDatabase()
    const admin = (await db.select().from(adminsTable).where(eq(adminsTable.id, id)).limit(1))[0]
    return admin as unknown as Admin
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

const getByUsername = async (username: string): Promise<Admin> => {
  try {
    const db = getDatabase()
    const admin = (await db.select().from(adminsTable).where(eq(adminsTable.username, username)).limit(1))[0]
    return admin as unknown as Admin
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

const persists = async (id: number): Promise<boolean> => {
  try {
    const admin = await getById(id)
    return !!admin
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

const getAll = async (): Promise<Admin[]> => {
  try {
    const db = getDatabase()
    const admins = await db.select().from(adminsTable)
    return admins as unknown[] as Admin[]
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

// const getByFilter = async (filter: Partial<Admin>): Promise<Admin[]> => {
//   try {
//     const db = getDatabase()
//     const items = await db.query.adminsTable.findMany({ with: filter })
//     return items
//   } catch (error) {
//     throw new Error(JSON.stringify(error))
//   }
// }

const add = async (admin: Admin): Promise<Admin> => {
  try {
    const db = getDatabase()
    const adminEntity: typeof adminsTable.$inferInsert = { ...admin }
    const result = await db.insert(adminsTable).values(adminEntity)
    return result as unknown as Admin
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

const update = async (id: number, data: Partial<Admin>) => {
  try {
    const admin = await getById(id)
    Object.keys(data).forEach(key => {
      if (key in admin) {
        ;(admin as any)[key] = (data as any)[key]
      }
    })
    const db = getDatabase()
    await db.update(adminsTable).set(admin).where(eq(adminsTable.id, id))
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

const delete_ = async (id: number) => {
  try {
    const db = getDatabase()
    await db.delete(adminsTable).where(eq(adminsTable.id, id))
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

export default {
  getById,
  getByUsername,
  getAll,
  persists,
  add,
  update,
  delete_,
}
