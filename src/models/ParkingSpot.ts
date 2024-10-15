export interface ParkingSpot {
  id: number
  spotNumber: string
  isOccupied: boolean
  location?: string
}

const isParkingSpot = (arg: unknown): arg is ParkingSpot => {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'id' in arg &&
    'spotNumber' in arg &&
    'isOccupied' in arg &&
    typeof arg.id === 'number' &&
    typeof arg.spotNumber === 'string' &&
    typeof arg.isOccupied === 'boolean' &&
    ('location' in arg ? typeof arg.location === 'string' : true)
  )
}

const isPartialParkingSpot = (arg: unknown): arg is Partial<ParkingSpot> => {
  return (
    !!arg &&
    typeof arg === 'object' &&
    (('id' in arg && typeof arg.id === 'number') ||
      ('spotNumber' in arg && typeof arg.spotNumber === 'string') ||
      ('isOccupied' in arg && typeof arg.isOccupied === 'boolean') ||
      ('location' in arg ? typeof arg.location === 'string' : false))
  )
}

export default {
  isParkingSpot,
  isPartialParkingSpot,
}
