import { ParkingSpot } from '@src/models/ParkingSpot'
import axios from 'axios'
import fs from 'fs'
const parkingSpots: ParkingSpot[] = JSON.parse(
  fs.readFileSync(
    '/home/danyer/Documents/Trabajo/Prueba técnica con Guajiritos SRL/ParkingProject/src/models/parkingSpots.json',
    'utf8'
  )
)

const addParkingSpots = async () => {
  try {
    const responses = await Promise.all(
      parkingSpots.map(spot => axios.post('http://localhost:3000/api/parking-spots/add', { parkingSpot: spot }))
    )

    responses.forEach(response => {
      console.log(`Parking Spot added: ${response.data}`)
    })
  } catch (error) {
    console.error('Error adding parking spots:', error)
  }
}

addParkingSpots()
