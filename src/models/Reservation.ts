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
    isArgValid &&
    'id' in arg &&
    typeof arg.id === 'number' &&
    'customerId' in arg &&
    typeof arg.customerId === 'number' &&
    'vehicleId' in arg &&
    typeof arg.vehicleId === 'number' &&
    'parkingSpotId' in arg &&
    typeof arg.parkingSpotId === 'number' &&
    'startTime' in arg &&
    typeof arg.startTime === 'string' &&
    Boolean(Date.parse(arg.startTime)) &&
    'endTime' in arg &&
    typeof arg.endTime === 'string' &&
    Boolean(Date.parse(arg.endTime)) &&
    isValidStatus
  )
}

export function isPartialReservation(arg: unknown): arg is Partial<Reservation> {
  const isArgValid = !!arg && typeof arg === 'object'
  const isValidStatus =
    isArgValid && 'status' in arg && Object.values(ReservationStatus).includes(arg.status as ReservationStatus)
  return (
    isArgValid &&
    ('id' in arg ? typeof arg.id === 'number' : true) &&
    ('customerId' in arg ? typeof arg.customerId === 'number' : true) &&
    ('vehicleId' in arg ? typeof arg.vehicleId === 'number' : true) &&
    ('parkingSpotId' in arg ? typeof arg.parkingSpotId === 'number' : true) &&
    ('startTime' in arg ? typeof arg.startTime === 'string' && Boolean(Date.parse(arg.startTime)) : true) &&
    ('endTime' in arg ? typeof arg.endTime === 'string' && Boolean(Date.parse(arg.endTime)) : true) &&
    ('status' in arg ? isValidStatus : true)
  )
}

export default {
  isReservation,
  isPartialReservation,
}
