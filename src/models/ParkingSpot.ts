export interface ParkingSpot {
  id: number
  spotNumber: string
  isReserved: boolean
  location?: string
}

export type ParkingSpotOccupationDetails = {
  spotNumber: string
  location?: string
  isOccupied: boolean
  time: Date
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
    ('id' in arg ? typeof arg.id === 'number' : true) &&
    ('spotNumber' in arg ? typeof arg.spotNumber === 'string' : true) &&
    ('isReserved' in arg ? typeof arg.isReserved === 'boolean' : true) &&
    ('location' in arg ? typeof arg.location === 'string' : true)
  )
}

export default {
  isParkingSpot,
  isPartialParkingSpot,
}
