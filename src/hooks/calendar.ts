import { useServiceTracker, IServiceTracker } from './service-tracker'
import { CalendarService, ICalendar } from '../services/calendar'
import { useActiveCalendarSelector } from '../hooks/global-selector'

export function useCalendarFetchAll(): IServiceTracker<ICalendar[] | null> | undefined {
  const errorMessage = 'Unable to fetch calendars'
  const fetchAllCalendars = async (): Promise<ICalendar[]> => {
    const service = CalendarService.create()
    const calendars = await service.getAll()
    return calendars
  }
  return useServiceTracker<ICalendar[] | null>(fetchAllCalendars, errorMessage)
}

export function useCalendarFetchById(id: string | undefined): IServiceTracker<ICalendar | null> | undefined {
  const isCalendarActive = useActiveCalendarSelector()
  const errorMessage = 'Unable to fetch calendar info'
  const fetchAllCalendars = async (): Promise<ICalendar | null> => {
    if (isCalendarActive) return null
    if (id === undefined) {
      throw new Error('Id is required')
    }
    const service = CalendarService.create()
    const calendar = await service.getById(id)
    return calendar
  }
  return useServiceTracker<ICalendar | null>(fetchAllCalendars, errorMessage)
}
