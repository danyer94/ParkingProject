import { Customer } from '@src/models/Customer'
import axios from 'axios'
import fs from 'fs'

const customers: Customer[] = JSON.parse(
  fs.readFileSync(
    '/home/danyer/Documents/Trabajo/Prueba técnica con Guajiritos SRL/ParkingProject/src/models/customers.json',
    'utf8'
  )
)

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqcGVyZXoiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Mjk4OTQ5MjIsImV4cCI6MTczMDE1NDEyMn0.RwHTYkXOU9mW-moH0bsN1o0mOjqZnWm40R-97Ezj_rY'

const updateCustomers = async () => {
  try {
    const responses = await Promise.all(
      customers.map(customer =>
        axios.patch(
          `http://localhost:3000/api/customers/update/${customer.id}`,
          {
            customer: {
              password: customer.password,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      )
    )

    responses.forEach(response => {
      console.log(`Customer updated: ${response}`)
    })
  } catch (error) {
    console.error('Error updating customers:', error)
  }
}

updateCustomers()
