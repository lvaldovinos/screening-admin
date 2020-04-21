import React from 'react'
import { css } from 'emotion'

const style = css`
  margin: 0 auto;
  max-width: 50em;
`

export function Center ({ children }) {
  return <section className={style}>{children}</section>
}
