import { RefObject } from 'react'
import { Subscriber, TSubscriber } from './subscriber'

type TValidator = (value?: string) => string
interface IFieldObject {
  [index: string]: string
}

class Form {
  readonly subscriber: Subscriber
  readonly fields: Map<string, Field>
  constructor(fields?: Map<string, Field>) {
    if (fields === undefined) {
      this.fields = new Map<string, Field>()
    } else {
      this.fields = fields
    }
    this.subscriber = new Subscriber()
  }

  initialize(formRef: RefObject<HTMLFormElement>): Form {
    if (formRef.current === null) {
      throw new Error('formRef does not value current property')
    }
    const inputs = Array.from(formRef.current.querySelectorAll('input'))
    if (inputs.length === 0) {
      throw new Error('form requires inputs with valid name attribute')
    }
    for (const input of inputs) {
      const nameAttr = input.getAttribute('name')
      if (nameAttr == null) {
        throw new Error('input element has not name attribute')
      }
      this.fields.set(nameAttr, new Field(() => this.subscriber.notify()))
    }
    return this
  }

  subscribe(subscriber: TSubscriber): number {
    return this.subscriber.addSubscriber(subscriber)
  }

  unsubscribe(subscriberIndex: number): void {
    this.subscriber.removeSubscriber(subscriberIndex)
  }

  getField(fieldName: string): Field | undefined {
    return this.fields.get(fieldName)
  }

  toBody(): string {
    const fieldsObj: IFieldObject = {}
    for (const [key, field] of this.fields) {
      fieldsObj[key] = field.value
    }
    return JSON.stringify(fieldsObj)
  }
}

class Field {
  private _validator: TValidator
  private _error: string
  private _value: string
  private _initialValue: string
  readonly formSubscriber: TSubscriber
  constructor(formSubscriber: TSubscriber) {
    this.formSubscriber = formSubscriber
    this._initialValue = ''
    this._validator = () => ''
    this._error = ''
    this._value = ''
  }

  get validator(): TValidator {
    return this._validator
  }

  set validator(validator: TValidator) {
    this._validator = validator
  }

  get value(): string {
    return this._value
  }

  set value(value: string) {
    this._value = value
  }

  get error(): string {
    return this._error
  }

  set error(error: string) {
    this._error = error
  }

  get initialValue(): string {
    return this._initialValue
  }

  set initialValue(initialValue: string) {
    this._value = initialValue
    this._initialValue = initialValue
  }

  reset(): Field {
    this._value = this._initialValue
    this._error = ''
    this.formSubscriber()
    return this
  }

  setValue(value: string): Field {
    this._value = value
    this.formSubscriber()
    return this
  }

  validate(): Field {
    this._error = this.validator(this.value)
    this.formSubscriber()
    return this
  }

  static clone(field: Field): Field {
    const newField = new Field(field.formSubscriber)
    newField.initialValue = field.initialValue
    newField.error = field.error
    newField.value = field.value
    newField.validator = field.validator
    return newField
  }
}

export { Field, Form, TValidator }
