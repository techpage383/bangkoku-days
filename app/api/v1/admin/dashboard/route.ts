import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { success, error } from '@/lib/api-response'
import { requireRole } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    await requireRole(['SUPER_ADMIN', 'ADMIN', 'EDITOR'])
    
    const [
      totalPlaces,
      publishedPlaces,
      pendingInquiries,
      totalArticles,
      totalPosts
    ] = await Promise.all([
      prisma.place.count(),
      prisma.place.count({ where: { status: 'PUBLISHED' } }),
      prisma.inquiry.count({ where: { status: 'PENDING' } }),
      prisma.article.count({ where: { published: true } }),
      prisma.communityPost.count()
    ])
    
    return success({
      places: {
        total: totalPlaces,
        published: publishedPlaces,
        draft: totalPlaces - publishedPlaces
      },
      inquiries: {
        pending: pendingInquiries
      },
      articles: {
        total: totalArticles
      },
      community: {
        posts: totalPosts
      }
    })
  } catch (err) {
    return error(err)
  }
}
