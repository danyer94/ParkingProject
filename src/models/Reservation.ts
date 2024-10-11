export enum ReservationStatus {
  RESERVED = 'reserved',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

export interface Reservation {
  id: number
  customerId: number
  vehicleId: number
  parkingSpotId: number
  startTime: Date
  endTime: Date
  status: ReservationStatus
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
