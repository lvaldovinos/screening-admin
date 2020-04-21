import { Form } from '../lib/form'

const CALENDARS_URL = 'http://localhost:5000/calendars'

interface ICalendar {
  id: number
  interviewerName: string
  interviewerEmail: string
  publicName: string
}

interface ICalendarApi {
  id: string
  interviewer_fullname: string
  interviewer_email: string
  public_name: string
}

class CalendarService {
  readonly url: string
  constructor(url: string) {
    this.url = url
  }

  async save(calendar: Form): Promise<void> {
    const body: string = calendar.toBody()
    await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
  }

  async getAll(): Promise<ICalendar[]> {
    const response = await fetch(this.url)
    const results = await response.json()
    return results.map((result: ICalendarApi) => ({
      id: result.id,
      interviewerName: result.interviewer_fullname,
      interviewerEmail: result.interviewer_email,
      publicName: result.public_name
    }))
  }

  async getById(id: string): Promise<ICalendar> {
    const url = `${this.url}/${id}`
    const response = await fetch(url)
    const result = await response.json()
    return {
      id: result.id,
      interviewerName: result.interviewer_fullname,
      interviewerEmail: result.interviewer_email,
      publicName: result.public_name
    }
  }

  static create(): CalendarService {
    return new CalendarService(CALENDARS_URL)
  }
}

export { CalendarService, ICalendar }
