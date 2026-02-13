import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { success, error } from '@/lib/api-response'
import { requireRole } from '@/lib/auth'
import { errors } from '@/lib/errors'

export async function PATCH(req: NextRequest) {
  try {
    await requireRole(['SUPER_ADMIN', 'ADMIN'])
    
    const { searchParams } = req.nextUrl
    const id = searchParams.get('id')
    const type = searchParams.get('type') // 'post' or 'reply'
    
    if (!id || !type) throw errors.badRequest('ID and type required')
    
    const body = await req.json()
    const { hidden } = body
    
    if (typeof hidden !== 'boolean') {
      throw errors.badRequest('hidden must be boolean')
    }
    
    if (type === 'post') {
      await prisma.communityPost.update({
        where: { id },
        data: { hidden }
      })
    } else if (type === 'reply') {
      await prisma.communityReply.update({
        where: { id },
        data: { hidden }
      })
    } else {
      throw errors.badRequest('Invalid type')
    }
    
    return success({ updated: true })
  } catch (err) {
    return error(err)
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireRole(['SUPER_ADMIN', 'ADMIN'])
    
    const { searchParams } = req.nextUrl
    const id = searchParams.get('id')
    const type = searchParams.get('type')
    
    if (!id || !type) throw errors.badRequest('ID and type required')
    
    if (type === 'post') {
      await prisma.communityPost.delete({ where: { id } })
    } else if (type === 'reply') {
      await prisma.communityReply.delete({ where: { id } })
    } else {
      throw errors.badRequest('Invalid type')
    }
    
    return success({ deleted: true })
  } catch (err) {
    return error(err)
  }
}
