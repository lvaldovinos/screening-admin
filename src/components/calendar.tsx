import React, { useContext, useEffect, ReactElement } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCalendarFetchById } from '../hooks/calendar'
import { GlobalStateContext } from '../App'

export function Calendar (): ReactElement | null {
  const { state, actions } = useContext(GlobalStateContext)
  const { calendarId } = useParams()
  const tracker = useCalendarFetchById(calendarId)
  useEffect(() => {
    if (tracker === undefined) return
    if (tracker.result !== null) {
      actions?.setActiveCalendar({
        id: tracker.result.id,
        publicName: tracker.result.publicName,
        interviewerName: tracker.result.interviewerName
      })
    }
  }, [tracker]) // eslint-disable-line
  if (state === undefined) {
    return null
  }
  if (state.activeCalendar === null) {
    return null
  }
  const id: string = state.activeCalendar.id.toString()
  const newCandidateUrl = `/calendar/${id}/schedule`
  return (
    <section className='section'>
      <h1 className='title'>Calendar</h1>
      <h3 className='subtitle'>{state?.activeCalendar?.interviewerName} - {state?.activeCalendar?.publicName} </h3>
      <section className='container'>
        <div className='level'>
          <div className='level-left'>
            <div className='level-item'>
            </div>
          </div>
          <div className='level-right'>
            <div className='level-item'>
              <Link
                to={newCandidateUrl}
                className='button is-info'
              >
                Schedule a candidate
              </Link>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
