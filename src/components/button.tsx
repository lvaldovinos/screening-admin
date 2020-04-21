import React, { ReactElement } from 'react'

interface IButton {
  label: string,
  modifier?: string,
  onClick?(): void
}

function Button (props: IButton): ReactElement {
  const { label, modifier = 'is-primary', onClick } = props
  const style = `button ${modifier}`
  return (
    <button
      className={style}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export { Button }
