import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { success, error } from '@/lib/api-response'
import { requireRole } from '@/lib/auth'
import { createPlaceSchema, updatePlaceSchema } from '@/lib/validations/place'
import { errors } from '@/lib/errors'

export async function POST(req: NextRequest) {
  try {
    await requireRole(['SUPER_ADMIN', 'ADMIN', 'EDITOR'])
    
    const body = await req.json()
    const data = createPlaceSchema.parse(body)
    
    const { translations, tagIds, ...placeData } = data
    
    const place = await prisma.place.create({
      data: {
        ...placeData,
        translations: {
          create: translations
        },
        ...(tagIds && {
          tags: {
            create: tagIds.map(tagId => ({ tagId }))
          }
        })
      },
      include: {
        translations: true,
        tags: { include: { tag: true } }
      }
    })
    
    return success(place, 201)
  } catch (err) {
    return error(err)
  }
}

export async function PUT(req: NextRequest) {
  try {
    await requireRole(['SUPER_ADMIN', 'ADMIN', 'EDITOR'])
    
    const { searchParams } = req.nextUrl
    const id = searchParams.get('id')
    if (!id) throw errors.badRequest('Place ID required')
    
    const body = await req.json()
    const data = updatePlaceSchema.parse(body)
    
    const { translations, tagIds, ...placeData } = data
    
    const place = await prisma.place.update({
      where: { id },
      data: {
        ...placeData,
        ...(translations && {
          translations: {
            deleteMany: {},
            create: translations
          }
        }),
        ...(tagIds && {
          tags: {
            deleteMany: {},
            create: tagIds.map(tagId => ({ tagId }))
          }
        })
      },
      include: {
        translations: true,
        tags: { include: { tag: true } }
      }
    })
    
    return success(place)
  } catch (err) {
    return error(err)
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireRole(['SUPER_ADMIN', 'ADMIN'])
    
    const { searchParams } = req.nextUrl
    const id = searchParams.get('id')
    if (!id) throw errors.badRequest('Place ID required')
    
    await prisma.place.delete({ where: { id } })
    
    return success({ deleted: true })
  } catch (err) {
    return error(err)
  }
}
