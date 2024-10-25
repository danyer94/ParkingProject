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
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqcGVyZXoiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Mjk1OTQ3OTAsImV4cCI6MTcyOTg1Mzk5MH0.M0vbSv7koTDW5NBDKKtUVUqUMyzmjqas2QzyBF2O5Z4'

const addCustomers = async () => {
  try {
    const responses = await Promise.all(
      customers.map(customer =>
        axios.post(
          'http://localhost:3000/api/customers/add',
          { customer },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      )
    )

    responses.forEach(response => {
      console.log(`Customer added: ${response}`)
    })
  } catch (error) {
    console.error('Error adding customers:', error)
  }
}

addCustomers()
