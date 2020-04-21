import * as React from 'react'
import { useParams } from 'react-router-dom'
import { InputWithField } from './input-field'
import { Button } from './button'
import { css } from 'emotion'
import { useField } from '../hooks/form'
import { ScheduleWeek } from './schedule-week'
import { Center } from './center'
import { GlobalStateContext } from '../App'
import { useCalendarFetchById } from '../hooks/calendar'

const styles = {
  container: css`
    padding: 4em 1em;
  `,
  form: css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  `
}

function ScheduleForm(): React.ReactElement | null {
  const formRef = React.useRef<HTMLFormElement>(null)
  const { state, actions } = React.useContext(GlobalStateContext)
  const { calendarId } = useParams()
  const tracker = useCalendarFetchById(calendarId)
  const candidateName = useField({ initialValue: '' })
  const openRole = useField({ initialValue: '' })
  React.useEffect(() => {
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
  const { publicName } = state.activeCalendar
  return (
    <Center>
      <section className={styles.container}>
        <h1 className='title'>Schedule new candidate</h1>
        <p className='subtitle'>Calendar: <strong>{publicName}</strong></p>
        <ScheduleWeek />
        <form
          ref={formRef}
          className={styles.form}
          onSubmit={(e) => e.preventDefault()}
        >
          <InputWithField
            label='Candidate name:'
            name='candidate_fullname'
            field={candidateName}
          />
          <InputWithField
            name="open_role"
            label="Open role:"
            field={openRole}
          />
          <Button
            label='Save'
            onClick={() => console.log('save')}
          />
        </form>
      </section>
    </Center>
  )
}

export { ScheduleForm }
