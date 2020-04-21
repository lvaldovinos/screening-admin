import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import { useCalendarFetchAll } from '../hooks/calendar'
import { Home } from './home'
import { css } from 'emotion'
import { Status } from '../lib/service-tracker'
import { Center } from './center'

const styles = {
  container: css`
    margin: 0 auto;
    max-width: 50em;
    height: 100vh;
    display:flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  `
}

function GetStarted(): ReactElement | null {
  const calendarTracker = useCalendarFetchAll()
  if (calendarTracker === undefined) return null
  if (calendarTracker.status !== Status.Done) return null
  if (calendarTracker.result?.length === 0 && calendarTracker.status === Status.Done) {
    return (
      <Center>
        <section className={styles.container}>
          <p>Seems there are no calendars yet, please get started!</p>
          <NavLink to='/new-calendar'>Get Started</NavLink>
        </section>
      </Center>
    )
  }
  return <Home />
}

export { GetStarted }
