export type FieldErrorsState<T> = {
  status: 'field-errors'
  errors: Partial<Record<keyof T, string>>
}

export type DefaultState = {
  status: 'default'
}

export type SubmitErrorState = {
  status: 'error'
  errors: string
}

export type SuccessState = {
  status: 'success'
}

export type CreateItemState<T> = { form: T } & (SuccessState | SubmitErrorState | FieldErrorsState<T> | DefaultState)

export type FormActionType = 'create' | 'update'

export type WithId<T> = T & { id: string }
