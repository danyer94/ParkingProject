import { boolean, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const admins = pgTable('admins', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phoneNumber: text('phoneNumber'),
  role: text('role').notNull(), // 'admin'
  permissions: text('permissions'),
  address: text('address'),
})

export const employees = pgTable('employees', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phoneNumber: text('phoneNumber'),
  role: text('role').notNull(), // 'employee'
  permissions: text('permissions'),
  address: text('address'),
})

export const customers = pgTable('customers', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phoneNumber: text('phoneNumber'),
  role: text('role').notNull(), // 'customer'
  permissions: text('permissions'),
  address: text('address'),
})

export const vehicles = pgTable('vehicles', {
  id: serial('id').primaryKey(),
  licensePlate: text('license_plate').notNull(),
  brand: text('brand'),
  model: text('model'),
  customerId: integer('customer_id').references(() => customers.id),
})

export const reservations = pgTable('reservations', {
  id: serial('id').primaryKey(),
  customerId: integer('customer_id').references(() => customers.id),
  vehicleId: integer('vehicle_id').references(() => vehicles.id),
  parkingSpotId: integer('parking_spot_id').references(() => parkingSpots.id),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time').notNull(),
  status: text('status').notNull(), // e.g., 'reserved', 'cancelled', 'completed'
})

export const parkingSpots = pgTable('parking_spots', {
  id: serial('id').primaryKey(),
  spotNumber: text('spot_number').notNull(),
  isOccupied: boolean('is_occupied').notNull().default(false),
  location: text('location'),
})
