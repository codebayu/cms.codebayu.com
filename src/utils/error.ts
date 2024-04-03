export class AuthenticationError extends Error {
  constructor() {
    super('You must be authenticated to do this action')
  }
}

export class ValidationError extends Error {
  private errors: Record<string, string | undefined>

  constructor(errors: Record<string, string | undefined>) {
    super('An validation error occured')
    this.errors = errors
  }

  getErrors() {
    return this.errors
  }
}
