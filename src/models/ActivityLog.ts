export interface ActivityLog {
  id: number
  activityType: string // e.g., 'reservation', 'cancellation', 'entry', 'exit'
  description?: string
  timestamp: Date
  userId: number
}
