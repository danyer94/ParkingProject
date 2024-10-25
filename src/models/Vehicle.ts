export interface Vehicle {
  id: number
  licensePlate: string
  brand?: string
  model?: string
  customerId: number
}

const isVehicle = (arg: unknown): arg is Vehicle => {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'id' in arg &&
    typeof arg.id === 'number' &&
    'licensePlate' in arg &&
    typeof arg.licensePlate === 'string' &&
    'customerId' in arg &&
    typeof arg.customerId === 'number' &&
    ('brand' in arg ? typeof arg.brand === 'string' : true) &&
    ('model' in arg ? typeof arg.model === 'string' : true)
  )
}

const isPartialVehicle = (arg: unknown): arg is Partial<Vehicle> => {
  return (
    !!arg &&
    typeof arg === 'object' &&
    ('id' in arg ? typeof arg.id === 'number' : true) &&
    ('licensePlate' in arg ? typeof arg.licensePlate === 'string' : true) &&
    ('customerId' in arg ? typeof arg.customerId === 'number' : true) &&
    ('brand' in arg ? typeof arg.brand === 'string' : true) &&
    ('model' in arg ? typeof arg.model === 'string' : true)
  )
}

export default {
  isVehicle,
  isPartialVehicle,
}
