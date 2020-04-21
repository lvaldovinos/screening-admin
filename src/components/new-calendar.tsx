import React, { ReactElement, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { InputWithField } from './input-field'
import { Button } from './button'
import { css } from 'emotion'
import { CalendarService } from '../services/calendar'
import { useField } from '../hooks/form'
import { Form, Field } from '../lib/form'
import { Center } from './center'

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

function NewCalendarForm(): ReactElement {
  const formRef = useRef<HTMLFormElement>(null)
  const history = useHistory()
  const interviewerFullNameField = useField({ initialValue: '' })
  const interviewerEmailField = useField({ initialValue: '' })
  const publicNameField = useField({ initialValue: '' })
  const saveCalendar = async (): Promise<void> => {
    try {
      const service = CalendarService.create()
      const fields = new Map([
        ['interviewer_fullname', interviewerFullNameField as Field],
        ['interviewer_email', interviewerEmailField as Field],
        ['public_name', publicNameField as Field]
      ])
      const form = new Form(fields)
      await service.save(form)
      history.push('/')
    } catch (e) {
      // TODO: handle error
      console.log(e)
    }
  }
  return (
    <Center>
      <section className={styles.container}>
        <h1 className='title'>New Calendar Form</h1>
        <form
          ref={formRef}
          className={styles.form}
          onSubmit={(e) => e.preventDefault()}
        >
          <InputWithField
            label='Interviewer name:'
            name='interviewer_fullname'
            field={interviewerFullNameField}
          />
          <InputWithField
            name="interviewer_email"
            label="Interviewer email:"
            field={interviewerEmailField}
          />
          <InputWithField
            name="public_name"
            label="Pulic name:"
            field={publicNameField}
          />
          <Button
            label='Save'
            onClick={async () => await saveCalendar()}
          />
        </form>
      </section>
    </Center>
  )
}

export { NewCalendarForm }
