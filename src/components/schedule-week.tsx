import * as React from 'react'
import moment, { Moment } from 'moment'
import { cx } from 'emotion'

const MEETING_DURATION = 60
const AVAILABLE_DAYS = new Set([1, 2, 3, 4, 5])
const AVAILABLE_HOURS = [7, 19]

interface IWeekNavigation {
  week: Moment,
  onChange(week: Moment): void
}

interface IDay {
  day: string,
  dayOfWeek: number
}

interface ISlotProps {
  slot: string
}

function getDaysOfWeek(week: Moment): React.ReactElement {
  const days: IDay[] = []
  const slotsInDay: string[] = []
  const start = moment(week.startOf('week').startOf('day').startOf('hour').startOf('minute'))
  const end = moment(week.endOf('week').endOf('day').endOf('hour').endOf('minute'))
  let current = moment(start)
  let currentDay = ''

  while (current.isSameOrBefore(end)) {
    if (currentDay !== current.format('MM/DD') && AVAILABLE_DAYS.has(current.weekday())) {
      days.push({
        day: current.format('MM/DD'),
        dayOfWeek: current.weekday()
      })
      currentDay = current.format('MM/DD')
    }
    current.add(MEETING_DURATION, 'minute')
  }
  const [startHour, endHour] = AVAILABLE_HOURS
  current = moment(start).hour(startHour)
  const startOfDay = moment(start).hour(startHour)
  const endOfDay = moment(start).hour(endHour)
  while (current.isBetween(startOfDay, endOfDay, undefined, '[)')) {
    slotsInDay.push(current.format('HH:mm'))
    current.add(MEETING_DURATION, 'minute')
  }
  const slots = slotsInDay.map((slot: string) => <Slot key={slot} slot={slot} />)
  const dayColumns = days.map((day: IDay) => (
    <div key={day.day} className='column'>
      <div className='columns is-multiline'>
        <div className='column is-full has-text-centered'>
          <p className='title is-6'>{day.day}</p>
        </div>
        {slots}
      </div>
    </div>
  ))
  return (
    <div className='columns'>
      {dayColumns}
    </div>
  )
}

function Slot ({ slot }: ISlotProps): React.ReactElement {
  return (
    <div className='column is-full has-text-centered'>
      <button className='button has-background-light has-text-grey'>{slot}</button>
    </div>
  )
}

function WeekNavigation (props: IWeekNavigation): React.ReactElement {
  const { onChange, week } = props
  const year = week.year()
  const weekAux = week.week()
  const isCurrentWeek = moment().week() === week.week()
  const weekClassname = cx('title is-4', {
    'has-text-primary': isCurrentWeek
  })
  const handleNavClick = (callback: () => number): void => {
    const newWeek = callback()
    onChange(moment().week(newWeek))
  }
  return (
    <div className='level'>
      <div className='level-left'>
        <div className='level-item'>
          <button
            className='button'
            onClick={() => handleNavClick(() => weekAux - 1)}
          >
            Back
          </button>
        </div>
      </div>
      <div className='level-item has-text-centered'>
        <div>
          <p className='heading'>Year {year}</p>
          <p className={weekClassname}>Week {weekAux}</p>
        </div>
      </div>
      <div className='level-right'>
        <div className='level-item'>
          <button
            className='button'
            onClick={() => handleNavClick(() => weekAux + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export function ScheduleWeek (): React.ReactElement {
  const [week, setWeek] = React.useState<Moment>(moment())
  const handleWeekChange = (week: Moment): void => {
    setWeek(week)
    console.log(week)
  }
  const days = getDaysOfWeek(week)
  return (
    <section>
      <WeekNavigation
        week={week}
        onChange={handleWeekChange}
      />
      {days}
    </section>
  )
}
