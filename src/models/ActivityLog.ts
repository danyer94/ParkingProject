import mongoose, { Document } from 'mongoose'

export type ActivityLog = {
  activityType: LogActivityType
  description?: string
  date: Date
  userId: number
}

export enum LogActivityType {
  RESERVATION = 'reservation',
  CANCELLATION = 'cancelation',
  ENTRY = 'entry',
  EXIT = 'exit',
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
  userId: {
    type: Number,
    required: [true, 'An ActivityLog must have a userId'],
  },
})

const activityLogModel =
  mongoose.models.ActivityLog || mongoose.model<ActivityLogDocument>('ActivityLog', ActivityLogSchema)

export { activityLogModel }
