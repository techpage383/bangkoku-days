import { z } from 'zod'
import { localeSchema } from './common'

export const createArticleSchema = z.object({
  slug: z.string().min(1).max(200),
  type: z.enum(['NEWS', 'GUIDE']),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  translations: z.array(z.object({
    locale: localeSchema,
    title: z.string().min(1),
    content: z.string().min(1),
    excerpt: z.string().optional(),
    coverUrl: z.string().url().optional(),
  })).min(1),
})

export const updateArticleSchema = createArticleSchema.partial()

export const articleFilterSchema = z.object({
  type: z.enum(['NEWS', 'GUIDE']).optional(),
  published: z.coerce.boolean().optional(),
  locale: localeSchema.default('ja'),
})

export type CreateArticle = z.infer<typeof createArticleSchema>
export type UpdateArticle = z.infer<typeof updateArticleSchema>
export type ArticleFilter = z.infer<typeof articleFilterSchema>
