import { Admin } from '@src/models/Admin'
import axios from 'axios'
import fs from 'fs'

const admins: Admin[] = JSON.parse(
  fs.readFileSync(
    '/home/danyer/Documents/Trabajo/Prueba técnica con Guajiritos SRL/ParkingProject/src/models/admins.json',
    'utf8'
  )
)

const addAdmins = async () => {
  try {
    const responses = await Promise.all(
      admins.map(admin => axios.post('http://localhost:3000/api/admins/add', { admin }))
    )

    responses.forEach(response => {
      console.log(`Admin added: ${response}`)
    })
  } catch (error) {
    console.error('Error adding admins:', error)
  }
}

addAdmins()
