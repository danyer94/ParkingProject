import Paths from '@src/common/Paths'
import axios from 'axios'

const parkingOccupationDetails = async () => {
  const response = await axios.post(
    'http://localhost:3000/api' + Paths.ParkingSpots.Base + Paths.ParkingSpots.OccupationDetails,
    {
      time: '2023-10-15T11:00:00Z',
    }
  )
  if (response.data['parkingOccupationDetails']) {
    console.log(response.data)
  } else console.log('We could not get the desired response')
}

parkingOccupationDetails()
