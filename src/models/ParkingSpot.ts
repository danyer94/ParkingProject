export interface ParkingSpot {
  id: number
  spotNumber: string
  isReserved: boolean
  location?: string
}

const isParkingSpot = (arg: unknown): arg is ParkingSpot => {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'id' in arg &&
    'spotNumber' in arg &&
    'isReserved' in arg &&
    typeof arg.id === 'number' &&
    typeof arg.spotNumber === 'string' &&
    typeof arg.isReserved === 'boolean' &&
    ('location' in arg ? typeof arg.location === 'string' : true)
  )
}

const isPartialParkingSpot = (arg: unknown): arg is Partial<ParkingSpot> => {
  return (
    !!arg &&
    typeof arg === 'object' &&
    (('id' in arg && typeof arg.id === 'number') ||
      ('spotNumber' in arg && typeof arg.spotNumber === 'string') ||
      ('isReserved' in arg && typeof arg.isReserved === 'boolean') ||
      ('location' in arg ? typeof arg.location === 'string' : false))
  )
}

export default {
  isParkingSpot,
  isPartialParkingSpot,
}
