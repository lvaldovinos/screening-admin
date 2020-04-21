import React, { ReactElement } from 'react'
import { CalendarList } from './calendar-list'
import { Center } from './center'
import { css } from 'emotion'

const style = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

function Home (): ReactElement {
  return (
    <section>
      <section className='hero is-info'>
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              Your company name here
            </h1>
            <h2 className="subtitle">
              Screening admin
            </h2>
          </div>
        </div>
      </section>
      <section className='section'>
        <Center>
          <div className={style}>
            <CalendarList />
          </div>
        </Center>
      </section>
    </section>
  )
}

export { Home }
