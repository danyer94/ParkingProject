import { Admin } from '@src/models/Admin'
import axios, { AxiosResponse } from 'axios'
import fs from 'fs'

const admins: Admin[] = JSON.parse(
  fs.readFileSync(
    '/home/danyer/Documents/Trabajo/Prueba técnica con Guajiritos SRL/ParkingProject/src/models/admins.json',
    'utf8'
  )
)

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqcGVyZXoiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Mjk4OTQ5MjIsImV4cCI6MTczMDE1NDEyMn0.RwHTYkXOU9mW-moH0bsN1o0mOjqZnWm40R-97Ezj_rY'

const addAdmins = async () => {
  try {
    const responses = await Promise.all(
      admins.map((admin, index) => {
        if (index > 0) {
          // Skip the first admin (its already added)
          return axios.post(
            'http://localhost:3000/api/admins/add',
            { admin },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        }
      })
    )

    responses.forEach(response => {
      console.log(`Admin added: ${response}`)
    })
  } catch (error) {
    console.error('Error adding admins:', error)
  }
}

addAdmins()
