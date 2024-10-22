import { ActivityLog, ActivityLogDocument, activityLogModel } from '@src/models/ActivityLog'
import { PaginationOptions, QueryExtraOptions } from '@src/routes/common/types'
import { FilterQuery } from 'mongoose'

type SortingOptions = {
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export class ActivityLogRepo {
  model: typeof activityLogModel
  defaultPage: number = 1
  defaultLimit: number = 100
  defaultSortBy: string = 'activityType'
  defaultSortOrder: 'asc' | 'desc' = 'asc'

  constructor(model: typeof activityLogModel) {
    this.model = model
  }

  getAll = async (
    filter: FilterQuery<ActivityLog>,
    options?: PaginationOptions & SortingOptions & QueryExtraOptions
  ) => {
    const {
      page = this.defaultPage,
      limit = this.defaultLimit,
      sortBy = this.defaultSortBy,
      sortOrder = this.defaultSortOrder,
      selectFields = '',
    } = options ?? {}
    let query = this.model.find(filter)
    const skip = (page - 1) * limit
    query = query
      .collation({ locale: 'es' })
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
    if (selectFields) query.select(selectFields)
    return query.exec()
  }

  getById = (id: string, options?: QueryExtraOptions) => {
    const { selectFields } = options ?? {}
    const query = this.model.findById(id)
    if (selectFields) query.select(selectFields)
    return query.exec()
  }

  add = (activityLog: ActivityLog) => {
    return this.model.create(activityLog)
  }

  update = (id: string, data: Partial<ActivityLogDocument>) => {
    return new Promise(async (resolve, reject) => {
      try {
        const activityLogDocument = await this.model.findById(id)
        Object.keys(data).forEach(key => {
          if (key in activityLogDocument) {
            ;(activityLogDocument as any)[key] = (data as any)[key]
          }
        })
        await activityLogDocument.save()
        resolve(activityLogDocument)
      } catch (error) {
        reject(error)
      }
    })
  }

  delete_ = (id: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.model.deleteOne({ id })
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }
}
