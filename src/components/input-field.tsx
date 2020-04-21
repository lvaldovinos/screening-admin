import React, { ReactElement } from 'react'
import { Input } from './input'
import { Field } from '../lib/form'

interface IInputWithFieldProps {
  name: string
  label: string
  field: Field | undefined
}

function InputWithField (props: IInputWithFieldProps): ReactElement | null {
  const { field, name, label } = props
  if (field === undefined) return null
  return (
    <Input
      name={name}
      label={label}
      value={field.value}
      onChange={({ currentTarget }) => field.setValue(currentTarget.value)}
    />
  )
}

export { InputWithField }
