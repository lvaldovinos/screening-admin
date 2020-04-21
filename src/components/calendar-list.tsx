import React, { useContext, ReactElement } from 'react'
import { useCalendarFetchAll } from '../hooks/calendar'
import { ICalendar } from '../services/calendar'
import { useHistory } from 'react-router-dom'
import { Status } from '../lib/service-tracker'
import { GlobalStateContext } from '../App'
import { css } from 'emotion'

const style = {
  container: css`
    width: 80%;
  `
}

export function CalendarList () : ReactElement | null {
  const { actions } = useContext(GlobalStateContext)
  const calendarTracker = useCalendarFetchAll()
  const history = useHistory()
  const handleCalendarClick = (calendar: ICalendar): void => {
    const calendarUrl = `/calendar/${calendar.id}`
    actions?.setActiveCalendar(calendar)
    history.push(calendarUrl)
  }
  if (calendarTracker === undefined) return null
  if (calendarTracker.status !== Status.Done) return null
  if (calendarTracker.result === null) return null
  const items = calendarTracker.result.map(calendar => {
    return (
      <li key={calendar.id}>
        <div className='box'>
          <section className='level'>
            <div className='level-left'>
              <div>
                <h1 className='title is-3'>{calendar.publicName}</h1>
                <h2 className='subtitle is-6'>{calendar.interviewerName}</h2>
              </div>
            </div>
            <div className='level-right'>
              <span className='icon has-text-primary' onClick={() => handleCalendarClick(calendar)}>
                <i className='fa fa-door-open' />
              </span>
            </div>
          </section>
        </div>
      </li>
    )
  })
  return <ul className={style.container}> {items} </ul>
}
