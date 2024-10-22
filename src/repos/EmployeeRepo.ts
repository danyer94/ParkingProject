import { employeesTable } from '@src/db/schema'
import { Employee } from '@src/models/Employee'
import { getDatabase } from './RepoUtils'
import { eq } from 'drizzle-orm'

const getById = async (id: number) => {
  try {
    const db = getDatabase()
    const employee = (await db.select().from(employeesTable).where(eq(employeesTable.id, id)).limit(1))[0]
    return employee as Employee
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

const getByUsername = async (username: string) => {
  try {
    const db = getDatabase()
    const employee = (await db.select().from(employeesTable).where(eq(employeesTable.username, username)).limit(1))[0]
    return employee as Employee
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

const persists = async (id: number): Promise<boolean> => {
  try {
    const employee = await getById(id)
    return !!employee
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

const getAll = async () => {
  try {
    const db = getDatabase()
    const empmloyees = await db.select().from(employeesTable)
    return empmloyees as Employee[]
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

// const getByFilter = async (filter: Partial<Employee>): Promise<Employee[]> => {
//   try {
//     const db = getDatabase()
//     const employees = await db.query.employeesTable.findMany({ with: filter }) // Apply the filter
//     return employees as Employee[]
//   } catch (error) {
//     throw new Error(JSON.stringify(error))
//   }
// }

const add = async (employee: Employee) => {
  try {
    const db = getDatabase()
    const employeeEntity: typeof employeesTable.$inferInsert = { ...employee }
    const addedEmployee = await db.insert(employeesTable).values(employeeEntity)
    return addedEmployee as unknown as Employee
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

const update = async (id: number, data: Partial<Employee>) => {
  try {
    const employee = await getById(id)
    Object.keys(data).forEach(key => {
      if (key in employee) {
        ;(employee as any)[key] = (data as any)[key]
      }
    })
    const db = getDatabase()
    await db.update(employeesTable).set(employee).where(eq(employeesTable.id, id))
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}

const delete_ = async (id: number) => {
  try {
    const db = getDatabase()
    await db.delete(employeesTable).where(eq(employeesTable.id, id))
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
