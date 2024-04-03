export class EntityValidationError<T extends string | number | symbol> extends Error {
  private errors: Record<T, string | undefined>

  constructor(errors: Record<T, string | undefined>) {
    super('An error occured validating an career entity')
    this.errors = errors
  }

  getErrors() {
    return this.errors
  }
}
