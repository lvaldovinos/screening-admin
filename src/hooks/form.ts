import { useState, useEffect, RefObject } from 'react'
import { Form, Field, TValidator } from '../lib/form'

interface IFieldOptions {
  initialValue: string,
  validator?: TValidator
}

function useForm(formRef: RefObject<HTMLFormElement>): Form | undefined {
  const [form, setForm] = useState<Form>()
  useEffect(() => {
    const form = new Form()
    const subscriberIndex = form
      .initialize(formRef)
      .subscribe(() => setForm((prevForm) => new Form(prevForm?.fields)))
    setForm(form)
    return () => form.unsubscribe(subscriberIndex)
  }, [formRef]) // eslint-disable-line

  return form
}

function useField(options: IFieldOptions): Field | undefined {
  const [field, setField] = useState<Field>()

  useEffect(() => {
    const subscriber = (): void => setField((prevField) => Field.clone(prevField as Field))
    const field = new Field(subscriber)
    field.initialValue = options.initialValue
    setField(field)
  }, [options.initialValue, options.validator])

  return field
}

export { useForm, useField }
