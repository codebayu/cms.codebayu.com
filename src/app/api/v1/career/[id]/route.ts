import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { CareerUseCase } from '@/usecase/career'
import { validateSignature } from '@/utils/functions'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id
  const headerList = headers()
  const signature = await validateSignature(headerList)

  if (!signature) return NextResponse.json({ statusCode: 401, message: 'Unauthorized', data: null })

  const usecase = new CareerUseCase()
  const data = await usecase.getCareerById(id)
  return NextResponse.json({ statusCode: 200, message: 'ok', data })
}
