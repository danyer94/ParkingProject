export interface Reservation {
  id: number
  customerId: number
  vehicleId: number
  parkingSpotId: number
  startTime: Date
  endTime: Date
  status: string // e.g., 'reserved', 'cancelled', 'completed'
}

// function createReservation(): Reservation {
//   return {
//     id: 0,
//     customerId: 0,
//     vehicleId: 0,
//     parkingSpotId: 0,
//     startTime: new Date(),
//     endTime: new Date(),
//     status: 'reserved',
//   }
// }
