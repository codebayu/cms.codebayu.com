import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { ProjectUseCase } from '@/usecase/project'
import { validateSignature } from '@/utils/functions'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const headerList = headers()
  const signature = await validateSignature(headerList)

  if (!signature) return NextResponse.json({ statusCode: 401, message: 'Unauthorized', data: null })

  const page = Number(request.nextUrl.searchParams.get('page')) || 1
  const usecase = new ProjectUseCase()
  const data = await usecase.getAllProject({ page })
  return NextResponse.json({ statusCode: 200, message: 'ok', data })
}
