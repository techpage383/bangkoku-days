import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { success, error } from '@/lib/api-response'
import { localeSchema } from '@/lib/validations/common'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const locale = localeSchema.parse(searchParams.get('locale') || 'ja')
    
    const areas = await prisma.area.findMany({
      include: {
        translations: {
          where: { locale }
        },
        _count: {
          select: { places: true }
        }
      },
      orderBy: {
        places: {
          _count: 'desc'
        }
      }
    })
    
    return success(areas)
  } catch (err) {
    return error(err)
  }
}
