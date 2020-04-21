import React, { ReactElement, FormEvent } from 'react'
import { css, cx } from 'emotion'

const style = css`
  width: 100%;
`

interface IInput {
  type: string
  name: string
  label: string
  value?: string
  placeholder?: string
  onChange?(e: FormEvent<HTMLInputElement>): void
}

function Input(props: IInput): ReactElement {
  const { type, name, label, value, placeholder, onChange } = props

  return (
    <div className={cx('field', style)}>
      <label className='label'>{label}</label>
      <div className='control'>
        <input
          className='input'
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

Input.defaultProps = {
  type: 'text'
}

export { Input }
