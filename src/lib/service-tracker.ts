import { Subscriber, TSubscriber } from './subscriber'

export enum Status {
  None,
  Processing,
  Done,
  Err
}

interface ITrackOptions<T> {
  callback(): Promise<T>
  errorMessage: string
}

export class ServiceTracker<T> {
  readonly subscriber: Subscriber
  private _status: Status
  private _result: T | null
  private _errorMessage: string

  get status(): Status {
    return this._status
  }

  get errorMessage(): string {
    if (this._status === Status.Err) {
      return this._errorMessage
    }
    return ''
  }

  get result(): T | null{
    return this._result
  }

  constructor() {
    this.subscriber = new Subscriber()
    this._status = Status.None
    this._result = null
    this._errorMessage = ''
  }

  async track(opts: ITrackOptions<T>): Promise<void> {
    const { callback, errorMessage } = opts
    this._status = Status.Processing
    this.subscriber.notify()
    try {
      const result = await callback()
      this._result = result
      this._status = Status.Done
    } catch (e) {
      // TODO: what to do with error?
      console.log(e)
      this._status = Status.Err
      this._errorMessage = errorMessage
    }
    this.subscriber.notify()
  }

  subscribe (subscriber: TSubscriber): number {
    return this.subscriber.addSubscriber(subscriber)
  }

  unsubscribe (subscriberIndex: number): void {
    this.subscriber.removeSubscriber(subscriberIndex)
  }
}
