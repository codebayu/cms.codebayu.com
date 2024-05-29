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

export class EntityValidationError<T extends string | number | symbol> extends Error {
  private errors: Record<T, string | undefined>

  constructor(errors: Record<T, string | undefined>) {
    super('An error occured validating entity')
    this.errors = errors
  }

  getErrors() {
    return this.errors
  }
}

export class PrismaError extends Error {
  constructor(code: string) {
    let message = 'Prisma error'
    switch (code) {
      case 'P2002':
        message = 'Prisma error: Duplicate field'
        break
      case 'P2003':
        message = 'Prisma error: Unique constraint violation'
        break
      case 'P2004':
        message = 'Prisma error: Foreign key constraint violation'
        break
      case 'P2007':
        message = 'Prisma error: Unique constraint violation on relation'
        break
      case 'P2025':
        message = 'Prisma error: Required field missing'
        break
      case 'P2026':
        message = 'Prisma error: Data validation error'
        break
      default:
        message = `Prisma error: ${code}`
    }
    super(message)
  }
}
