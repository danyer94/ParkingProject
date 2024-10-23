import mongoose, { Document } from 'mongoose'

export type ActivityLog = {
  activityType: LogActivityType
  description?: string
  date: Date
  customerId: number
}

export enum LogActivityType {
  RESERVATION = 'reservation',
  CANCELLATION = 'cancelation',
  ENTRY = 'entry',
  EXIT = 'exit',
}

export const isActivityLog = (arg: unknown): arg is ActivityLog => {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'activityType' in arg &&
    typeof arg.activityType === 'string' &&
    Object.values(LogActivityType).includes(arg.activityType as LogActivityType) &&
    ('description' in arg ? typeof arg.description === 'string' : true) &&
    'date' in arg &&
    typeof arg.date === 'string' &&
    Boolean(Date.parse(arg.date)) &&
    'customerId' in arg &&
    typeof arg.customerId === 'number'
  )
}

export const isPartialActivityLog = (arg: unknown): arg is Partial<ActivityLog> => {
  return (
    !!arg &&
    typeof arg === 'object' &&
    ('activityType' in arg ? typeof arg.activityType === 'string' : false) &&
    ('description' in arg ? typeof arg.description === 'string' : false) &&
    ('date' in arg ? typeof arg.date === 'string' && Boolean(Date.parse(arg.date)) : false) &&
    ('customerId' in arg ? typeof arg.customerId === 'number' : false)
  )
}

export interface ActivityLogDocument extends ActivityLog, Document {}

const ActivityLogSchema = new mongoose.Schema<ActivityLogDocument>({
  activityType: {
    type: String,
    enum: Object.values(LogActivityType),
    required: [true, 'An ActivityLog must have a activityType'],
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    required: [true, 'An ActivityLog must have a date'],
  },
  customerId: {
    type: Number,
    required: [true, 'An ActivityLog must have a customerId'],
  },
})

const activityLogModel =
  mongoose.models.ActivityLog || mongoose.model<ActivityLogDocument>('ActivityLog', ActivityLogSchema)

export { activityLogModel }
export default { isActivityLog, isPartialActivityLog }
