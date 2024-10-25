import { customersTable } from '@src/db/schema'
import { Customer } from '@src/models/Customer'
import { getDatabase } from './RepoUtils'
import { eq } from 'drizzle-orm'

const getById = async (id: number): Promise<Customer> => {
  try {
    const db = getDatabase()
    const customer = (await db.select().from(customersTable).where(eq(customersTable.id, id)).limit(1))[0]
    return customer as unknown as Customer
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

const getByUsername = async (username: string): Promise<Customer> => {
  try {
    const db = getDatabase()
    const customer = (await db.select().from(customersTable).where(eq(customersTable.username, username)).limit(1))[0]
    return customer as unknown as Customer
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

const persists = async (id: number): Promise<boolean> => {
  try {
    const customer = await getById(id)
    return !!customer
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

const getAll = async (): Promise<Customer[]> => {
  try {
    const db = getDatabase()
    const customers = await db.select().from(customersTable)
    return customers as unknown[] as Customer[]
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

//TODO Do the query using select from and where, obtaining each property and its value to form a generic filter
// const getByFilter = async (filter: Partial<Customer>): Promise<Customer[]> => {
//   try {
//     const db = getDatabase()
//     const items = await db.query.customersTable.findMany({ with: filter })
//     return items
//   } catch (error) {
//     throw new Error(JSON.stringify(error))
//   }
// }

const add = async (customer: Customer): Promise<Customer> => {
  try {
    const db = getDatabase()
    const customerEntity: typeof customersTable.$inferInsert = { ...customer }
    const result = await db.insert(customersTable).values(customerEntity)
    return result as unknown as Customer
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

const update = async (id: number, data: Partial<Customer>) => {
  try {
    const customer = await getById(id)
    Object.keys(data).forEach(key => {
      if (key in customer) {
        ;(customer as any)[key] = (data as any)[key]
      }
    })
    const db = getDatabase()
    await db.update(customersTable).set(customer).where(eq(customersTable.id, id))
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

const delete_ = async (id: number) => {
  try {
    const db = getDatabase()
    await db.delete(customersTable).where(eq(customersTable.id, id))
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
