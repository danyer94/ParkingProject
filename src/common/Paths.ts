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
  Login: {
    Base: '/login',
    Public: '/public',
    Private: '/private',
  },
  Signup: {
    Base: '/signup',
    Public: '/public',
    Private: '/private',
  },
  Users: {
    Base: '/users',
    ...crud_base,
  },
  Admins: {
    Base: '/admins',
    ...crud_base,
  },
  Employees: {
    Base: '/employees',
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
    OccupationDetails: '/occupation-details',
  },
  Reservations: {
    Base: '/reservations',
    ...crud_base,
    Reserve: '/reserve',
  },
  ActivityLogs: {
    Base: '/activity-logs',
    ...crud_base,
  },
} as const
