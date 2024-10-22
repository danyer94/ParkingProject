import { Customer } from '@src/models/Customer'
import axios from 'axios'
import fs from 'fs'

const customers: Customer[] = JSON.parse(
  fs.readFileSync(
    '/home/danyer/Documents/Trabajo/Prueba técnica con Guajiritos SRL/ParkingProject/src/models/customers.json',
    'utf8'
  )
)

const addCustomers = async () => {
  try {
    const responses = await Promise.all(
      customers.map(customer => axios.post('http://localhost:3000/api/customers/add', { customer }))
    )

    responses.forEach(response => {
      console.log(`Customer added: ${response}`)
    })
  } catch (error) {
    console.error('Error adding customers:', error)
  }
}

addCustomers()
