/**
 * Express router paths go here.
 */

const crud_base = {
  Get: '/all',
  Add: '/add',
  Update: '/update/:id',
  Delete: '/delete/:id',
}

export default {
  Base: '/api',
  Users: {
    Base: '/users',
    ...crud_base,
  },
  Admins: {
    Base: '/admins',
    ...crud_base,
  },
  Emplployees: {
    Base: '/emplployees',
    ...crud_base,
  },
  Customers: {
    Base: '/customers',
    ...crud_base,
  },
  Vehicles: {
    Base: '/vehicles',
    ...crud_base,
  },
  ParkingSpots: {
    Base: '/parking-spots',
    ...crud_base,
  },
} as const
