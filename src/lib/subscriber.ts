export type TSubscriber = () => void

export class Subscriber {
  private subscribers: TSubscriber[]
  constructor() {
    this.subscribers = []
  }

  notify (): void {
    this.subscribers.forEach((subscriber: TSubscriber) => subscriber())
  }

  addSubscriber(subscriber: TSubscriber): number {
    this.subscribers = [
      ...this.subscribers,
      subscriber
    ]
    return this.subscribers.length
  }

  removeSubscriber(subscriberIndex: number): void {
    this.subscribers = [
      ...this.subscribers.slice(0, subscriberIndex),
      ...this.subscribers.slice(subscriberIndex + 1)
    ]
  }

  removeAllSubscribers(): void {
    this.subscribers = []
  }
}
