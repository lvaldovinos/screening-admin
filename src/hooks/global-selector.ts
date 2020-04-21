import { useContext } from 'react'
import { GlobalStateContext } from '../App'

export function useActiveCalendarSelector(): boolean {
  const { state } = useContext(GlobalStateContext)
  return state?.activeCalendar !== null
}
