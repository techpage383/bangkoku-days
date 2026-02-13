import { NextResponse } from 'next/server'
import { ApiError } from './errors'

export const success = <T>(data: T, status = 200) => {
  return NextResponse.json({ success: true, data }, { status })
}

export const error = (err: unknown) => {
  if (err instanceof ApiError) {
    return NextResponse.json(
      { success: false, error: err.message, code: err.code },
      { status: err.statusCode }
    )
  }
  
  console.error('Unexpected error:', err)
  return NextResponse.json(
    { success: false, error: 'Internal server error' },
    { status: 500 }
  )
}

export const paginated = <T>(data: T[], total: number, page: number, limit: number) => {
  return success({
    items: data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  })
}
