import React, { useReducer, ReactElement } from 'react'
import { Calendar } from './components/calendar'
import { GetStarted } from './components/get-started'
import { NewCalendarForm } from './components/new-calendar'
import { ScheduleForm } from './components/schedule-form'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

interface IActiveCalendar {
  id: number
  publicName: string
  interviewerName: string
}

interface IAppState {
  activeCalendar: IActiveCalendar | null
}

type TAction =
  | {
    type: 'SET_ACTIVE_CALENDAR',
    activeCalendar: IActiveCalendar
  }
  | { type: 'CLEAR_ACTIVE_CALENDAR' }

function globalAppReducer (state: IAppState, action: TAction): IAppState {
  switch (action.type) {
    case 'SET_ACTIVE_CALENDAR':
      const { id, publicName, interviewerName } = action.activeCalendar // eslint-disable-line
      return {
        ...state,
        activeCalendar: {
          id,
          publicName,
          interviewerName
        }
      }
    case 'CLEAR_ACTIVE_CALENDAR':
      return {
        ...state,
        activeCalendar: null
      }
    default:
      return state
  }
}

const initialState: IAppState = {
  activeCalendar: null
}

interface IGlobalStateActions {
  setActiveCalendar(activeCalendar: IActiveCalendar): void,
  clearActiveCalendar(): void
}

interface IStateContext {
  state: IAppState,
  actions: IGlobalStateActions
}

export const GlobalStateContext = React.createContext<Partial<IStateContext>>({})

function useGlobalState (): IStateContext {
  const [state, dispatch] = useReducer(globalAppReducer, initialState)

  function setActiveCalendar (
    activeCalendar: IActiveCalendar
  ): void {
    dispatch({
      type: 'SET_ACTIVE_CALENDAR',
      activeCalendar
    })
  }

  function clearActiveCalendar (
  ): void {
    dispatch({
      type: 'CLEAR_ACTIVE_CALENDAR'
    })
  }

  return {
    state,
    actions: {
      setActiveCalendar,
      clearActiveCalendar
    }
  }
}

function App(): ReactElement {
  const { state, actions } = useGlobalState()
  return (
    <GlobalStateContext.Provider value={{
      state,
      actions
      }}>
      <section>
        <Router>
          <Switch>
            <Route path="/new-calendar">
              <NewCalendarForm />
            </Route>
            <Route path="/calendar/:calendarId/schedule">
              <ScheduleForm />
            </Route>
            <Route path="/calendar/:calendarId">
              <Calendar />
            </Route>
            <Route path="/">
              <GetStarted />
            </Route>
          </Switch>
        </Router>
      </section>
    </GlobalStateContext.Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
