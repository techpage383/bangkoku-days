import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { success, error } from '@/lib/api-response'
import { createInquirySchema } from '@/lib/validations/inquiry'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = createInquirySchema.parse(body)
    
    const inquiry = await prisma.inquiry.create({
      data
    })
    
    // TODO: Send auto-reply email
    
    return success(inquiry, 201)
  } catch (err) {
    return error(err)
  }
}
