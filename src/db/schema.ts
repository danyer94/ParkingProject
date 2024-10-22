import { boolean, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

const timestamps = {
  // updated_at: timestamp(),
  created: timestamp().defaultNow().notNull(),
  // deleted_at: timestamp(),
}

export const adminsTable = pgTable('admins', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  username: text('username').notNull(),
  email: text('email').notNull(),
  phoneNumber: text('phoneNumber'),
  role: text('role').notNull(), // 'admin'
  permissions: text('permissions'),
  password: text('password'),
  address: text('address'),
  ...timestamps,
})

export const employeesTable = pgTable('employees', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  username: text('username').notNull(),
  email: text('email').notNull(),
  phoneNumber: text('phoneNumber'),
  role: text('role').notNull(), // 'employee'
  permissions: text('permissions'),
  password: text('password'),
  address: text('address'),
  ...timestamps,
})

export const customersTable = pgTable('customers', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  username: text('username').notNull(),
  email: text('email').notNull(),
  phoneNumber: text('phoneNumber'),
  role: text('role').notNull(), // 'customer'
  permissions: text('permissions'),
  address: text('address'),
  ...timestamps,
})

export const vehiclesTable = pgTable('vehicles', {
  id: serial('id').primaryKey(),
  licensePlate: text('license_plate').notNull(),
  brand: text('brand'),
  model: text('model'),
  customerId: integer('customer_id').references(() => customersTable.id),
})

export const reservationsTable = pgTable('reservations', {
  id: serial('id').primaryKey(),
  customerId: integer('customer_id').references(() => customersTable.id),
  vehicleId: integer('vehicle_id').references(() => vehiclesTable.id),
  parkingSpotId: integer('parking_spot_id').references(() => parkingSpotsTable.id),
  startTime: timestamp('start_time', { withTimezone: true }).notNull(),
  endTime: timestamp('end_time', { withTimezone: true }).notNull(),
  status: text('status').notNull(), // e.g., 'reserved', 'cancelled', 'completed'
})

export const parkingSpotsTable = pgTable('parking_spots', {
  id: serial('id').primaryKey(),
  spotNumber: text('spot_number').notNull(),
  isReserved: boolean('is_reserved').notNull().default(false),
  location: text('location'),
})

export const customerRelations = relations(customersTable, ({ many }) => ({
  vehicles: many(vehiclesTable),
  reservations: many(reservationsTable),
}))

export const vehicleRelations = relations(vehiclesTable, ({ one, many }) => ({
  owner: one(customersTable, {
    fields: [vehiclesTable.customerId],
    references: [customersTable.id],
  }),
  reservation: many(reservationsTable),
}))

export const reservationRelations = relations(reservationsTable, ({ one }) => ({
  customer: one(customersTable, {
    fields: [reservationsTable.customerId],
    references: [customersTable.id],
  }),
  vehicle: one(vehiclesTable, {
    fields: [reservationsTable.vehicleId],
    references: [vehiclesTable.id],
  }),
  parkingSpot: one(parkingSpotsTable, {
    fields: [reservationsTable.parkingSpotId],
    references: [parkingSpotsTable.id],
  }),
}))

export const parkingSpotRelations = relations(parkingSpotsTable, ({ many }) => ({
  reservation: many(reservationsTable),
}))
