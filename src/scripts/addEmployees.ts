import { Employee } from '@src/models/Employee'
import axios from 'axios'
import fs from 'fs'

const employees: Employee[] = JSON.parse(
  fs.readFileSync(
    '/home/danyer/Documents/Trabajo/Prueba técnica con Guajiritos SRL/ParkingProject/src/models/employees.json',
    'utf8'
  )
)

const addEmployees = async () => {
  try {
    const responses = await Promise.all(
      employees.map(employee => axios.post('http://localhost:3000/api/employees/add', { employee }))
    )

    responses.forEach(response => {
      console.log(`Employee added: ${response}`)
    })
  } catch (error) {
    console.error('Error adding admins:', error)
  }
}

addEmployees()
