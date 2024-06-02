import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers'
import crypto from 'crypto'

export function generateSlug(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-{2,}/g, '-')
    .substring(0, 100)
}

export function generateRandomString(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let randomString = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    randomString += characters.charAt(randomIndex)
  }

  return randomString
}

export async function validateSignature(headers: ReadonlyHeaders) {
  const apiKey = process.env.API_KEY || ''
  const apiSecret = process.env.API_SECRET || ''
  const xSignature = headers.get('x-signature') || ''
  const xDatetime = Number(headers.get('x-datetime')) || 0

  if (!xSignature || !xDatetime) return false

  const datetime = new Date(xDatetime * 1000)
  const now = new Date()
  const diffInSeconds = Math.abs(now.getTime() - datetime.getTime()) / 1000

  if (diffInSeconds > 30) return false

  const hmac = crypto.createHmac('sha256', apiKey + xDatetime)
  hmac.update(apiSecret)
  const mac = hmac.digest()

  const eq = Buffer.from(xSignature, 'hex').compare(mac)

  if (eq !== 0) return false

  return true
}
