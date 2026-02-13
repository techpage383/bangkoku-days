import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { success, error } from '@/lib/api-response'
import { requireRole } from '@/lib/auth'
import { createArticleSchema, updateArticleSchema } from '@/lib/validations/article'
import { errors } from '@/lib/errors'

export async function POST(req: NextRequest) {
  try {
    await requireRole(['SUPER_ADMIN', 'ADMIN', 'EDITOR'])
    
    const body = await req.json()
    const data = createArticleSchema.parse(body)
    
    const { translations, ...articleData } = data
    
    const article = await prisma.article.create({
      data: {
        ...articleData,
        publishedAt: data.published ? new Date() : null,
        translations: {
          create: translations
        }
      },
      include: {
        translations: true
      }
    })
    
    return success(article, 201)
  } catch (err) {
    return error(err)
  }
}

export async function PUT(req: NextRequest) {
  try {
    await requireRole(['SUPER_ADMIN', 'ADMIN', 'EDITOR'])
    
    const { searchParams } = req.nextUrl
    const id = searchParams.get('id')
    if (!id) throw errors.badRequest('Article ID required')
    
    const body = await req.json()
    const data = updateArticleSchema.parse(body)
    
    const { translations, ...articleData } = data
    
    const article = await prisma.article.update({
      where: { id },
      data: {
        ...articleData,
        ...(data.published !== undefined && {
          publishedAt: data.published ? new Date() : null
        }),
        ...(translations && {
          translations: {
            deleteMany: {},
            create: translations
          }
        })
      },
      include: {
        translations: true
      }
    })
    
    return success(article)
  } catch (err) {
    return error(err)
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireRole(['SUPER_ADMIN', 'ADMIN'])
    
    const { searchParams } = req.nextUrl
    const id = searchParams.get('id')
    if (!id) throw errors.badRequest('Article ID required')
    
    await prisma.article.delete({ where: { id } })
    
    return success({ deleted: true })
  } catch (err) {
    return error(err)
  }
}
