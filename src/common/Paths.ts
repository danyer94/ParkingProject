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
    public: '/login',
    private: '/login/private',
  },
  Signup: {
    public: '/signup',
    private: '/signup/private',
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
} as const
