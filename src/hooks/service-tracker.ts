import { useState, useEffect } from 'react'
import { ServiceTracker, Status } from '../lib/service-tracker'

export interface IServiceTracker<T> {
  status: Status
  result: T
  errorMessage: string
}

export function useServiceTracker<T>(callback: () => Promise<T>, errorMessage: string): IServiceTracker<T | null> | undefined {
  const [tracker, setTracker] = useState<IServiceTracker<T | null>>()

  useEffect(() => {
    const serviceTracker = new ServiceTracker<T>()
    const subscriberIndex = serviceTracker.subscribe(() => {
      setTracker({
        status: serviceTracker.status,
        result: serviceTracker.result,
        errorMessage: serviceTracker.errorMessage
      })
    })
    serviceTracker
      .track({
        errorMessage,
        callback
      })
      .catch(() => {})

    return () => serviceTracker.unsubscribe(subscriberIndex)
  }, []) // eslint-disable-line

  return tracker
}
