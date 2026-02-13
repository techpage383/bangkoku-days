import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { success, error } from '@/lib/api-response'
import { requireRole } from '@/lib/auth'
import { createAdminSchema, updateAdminSchema } from '@/lib/validations/auth'
import { hashPassword } from '@/lib/password'
import { errors } from '@/lib/errors'

export async function GET(req: NextRequest) {
  try {
    await requireRole(['SUPER_ADMIN'])
    
    const admins = await prisma.adminUser.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        active: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: { createdAt: 'desc' }
    })
    
    return success(admins)
  } catch (err) {
    return error(err)
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireRole(['SUPER_ADMIN'])
    
    const body = await req.json()
    const data = createAdminSchema.parse(body)
    
    const hashedPassword = await hashPassword(data.password)
    
    const admin = await prisma.adminUser.create({
      data: {
        ...data,
        password: hashedPassword
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        active: true,
        createdAt: true
      }
    })
    
    return success(admin, 201)
  } catch (err) {
    return error(err)
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await requireRole(['SUPER_ADMIN'])
    
    const { searchParams } = req.nextUrl
    const id = searchParams.get('id')
    if (!id) throw errors.badRequest('Admin ID required')
    
    const body = await req.json()
    const data = updateAdminSchema.parse(body)
    
    const admin = await prisma.adminUser.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        active: true,
        updatedAt: true
      }
    })
    
    return success(admin)
  } catch (err) {
    return error(err)
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireRole(['SUPER_ADMIN'])
    
    const { searchParams } = req.nextUrl
    const id = searchParams.get('id')
    if (!id) throw errors.badRequest('Admin ID required')
    
    await prisma.adminUser.delete({ where: { id } })
    
    return success({ deleted: true })
  } catch (err) {
    return error(err)
  }
}
