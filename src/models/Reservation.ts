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

export function isReservation(arg: unknown): arg is Reservation {
  const isArgValid = !!arg && typeof arg === 'object'
  const isValidStatus =
    isArgValid && 'status' in arg && Object.values(ReservationStatus).includes(arg.status as ReservationStatus)
  return (
    typeof arg === 'object' &&
    arg !== null &&
    'id' in arg &&
    'customerId' in arg &&
    'vehicleId' in arg &&
    'parkingSpotId' in arg &&
    'startTime' in arg &&
    'endTime' in arg &&
    isValidStatus
  )
}

export function isPartialReservation(arg: unknown): arg is Partial<Reservation> {
  const isArgValid = !!arg && typeof arg === 'object'
  const isValidStatus =
    isArgValid && 'status' in arg && Object.values(ReservationStatus).includes(arg.status as ReservationStatus)
  return (
    typeof arg === 'object' &&
    arg !== null &&
    ('id' in arg ||
      'customerId' in arg ||
      'vehicleId' in arg ||
      'parkingSpotId' in arg ||
      'startTime' in arg ||
      'endTime' in arg ||
      ('status' in arg && isValidStatus))
  )
}

export default {
  isReservation,
  isPartialReservation,
}
