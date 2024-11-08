import { IEmployee } from '@src/models/Employee'
import axios from 'axios'
import fs from 'fs'

const employees: IEmployee[] = JSON.parse(
  fs.readFileSync(
    '/home/danyer/Documents/Trabajo/Prueba técnica con Guajiritos SRL/ParkingProject/src/models/employees.json',
    'utf8'
  )
)

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqcGVyZXoiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Mjk4OTQ5MjIsImV4cCI6MTczMDE1NDEyMn0.RwHTYkXOU9mW-moH0bsN1o0mOjqZnWm40R-97Ezj_rY'

const addEmployees = async () => {
  try {
    const responses = await Promise.all(
      employees.map(employee =>
        axios.post(
          'http://localhost:3000/api/employees/add',
          { employee },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      )
    )

    responses.forEach(response => {
      console.log(`Employee added: ${response.data}`)
    })
  } catch (error) {
    console.error('Error adding admins:', error)
  }
}

addEmployees()
