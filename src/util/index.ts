import dayjs from 'dayjs'

export const isValidDate = (date: string): boolean => {
  var customParseFormat = require('dayjs/plugin/customParseFormat')
  dayjs.extend(customParseFormat)
  const isValid = dayjs(date).isValid()
  return isValid
}

export const dateValidaton = (arg: unknown): arg is string => {
  var customParseFormat = require('dayjs/plugin/customParseFormat')
  dayjs.extend(customParseFormat)
  const isString = arg!! && typeof arg === 'string'
  // const isValid = isString && dayjs(arg, 'YYYY-MM-DDTHH:MM:SSZ', true).isValid()
  const isValid = isString && dayjs(arg).isValid()
  return isValid
}

/**
 * Converts a string representation of a date into a Date object.
 * Adjusts the time to account for the timezone offset.
 * Throws an error if the input string is not a valid date format.
 *
 * @param {string} stringDate - The string representation of the date.
 * @returns {Date} - The Date object created from the input string.
 * @throws {Error} - If the input string is not a valid date format.
 */
export const newDateFromString = (stringDate: string): Date => {
  const date = new Date(stringDate)
  if (!isValidDate(stringDate) || isNaN(date.getDate())) {
    throw new Error(`${newDateFromString}: Invalid date format at parameter stringDate: ${stringDate}`)
  }
  date.setHours(date.getHours() + date.getTimezoneOffset() / 60)
  return date
}

export const DateToUTCDate = (date: Date): Date => {
  const localDate = date
  const utcYear = localDate.getUTCFullYear()
  const utcMonth = localDate.getUTCMonth() // Recuerda que es 0-indexado
  const utcDate = localDate.getUTCDate()
  // const utcHours = localDate.getUTCHours()
  // const utcMinutes = localDate.getUTCMinutes()
  // const utcSeconds = localDate.getUTCSeconds()

  // const utcDateObject = new Date(Date.UTC(utcYear, utcMonth, utcDate, utcHours, utcMinutes, utcSeconds))

  const utcDateObject = new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60000)
  return utcDateObject
}
