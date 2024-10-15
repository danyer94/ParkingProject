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
