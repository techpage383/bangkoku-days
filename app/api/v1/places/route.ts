import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { success, error, paginated } from '@/lib/api-response'
import { placeFilterSchema } from '@/lib/validations/place'
import { paginationSchema } from '@/lib/validations/common'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const params = Object.fromEntries(searchParams)
    
    const filters = placeFilterSchema.parse(params)
    const { page, limit } = paginationSchema.parse(params)
    
    const where: any = { status: 'PUBLISHED' }
    if (filters.areaId) where.areaId = filters.areaId
    if (filters.categoryId) where.categoryId = filters.categoryId
    if (filters.priceRange) where.priceRange = filters.priceRange
    if (filters.featured !== undefined) where.featured = filters.featured
    
    const [places, total] = await Promise.all([
      prisma.place.findMany({
        where,
        include: {
          translations: {
            where: { locale: filters.locale }
          },
          area: {
            include: {
              translations: { where: { locale: filters.locale } }
            }
          },
          category: {
            include: {
              translations: { where: { locale: filters.locale } }
            }
          },
          images: { orderBy: { order: 'asc' }, take: 1 },
          tags: {
            include: {
              tag: {
                include: {
                  translations: { where: { locale: filters.locale } }
                }
              }
            }
          }
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: [
          { featured: 'desc' },
          { createdAt: 'desc' }
        ]
      }),
      prisma.place.count({ where })
    ])
    
    return paginated(places, total, page, limit)
  } catch (err) {
    return error(err)
  }
}
