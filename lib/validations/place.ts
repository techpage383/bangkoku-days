import { z } from 'zod'
import { localeSchema } from './common'

export const placeFilterSchema = z.object({
  areaId: z.string().uuid().optional(),
  categoryId: z.string().uuid().optional(),
  priceRange: z.coerce.number().int().min(1).max(5).optional(),
  featured: z.coerce.boolean().optional(),
  locale: localeSchema.default('ja'),
})

export const createPlaceSchema = z.object({
  slug: z.string().min(1).max(200),
  areaId: z.string().uuid().optional(),
  categoryId: z.string().uuid().optional(),
  priceRange: z.number().int().min(1).max(5).optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
  address: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  openingHours: z.record(z.any()).optional(),
  featured: z.boolean().default(false),
  translations: z.array(z.object({
    locale: localeSchema,
    name: z.string().min(1),
    description: z.string(),
  })).min(1),
  tagIds: z.array(z.string().uuid()).optional(),
})

export const updatePlaceSchema = createPlaceSchema.partial()

export type PlaceFilter = z.infer<typeof placeFilterSchema>
export type CreatePlace = z.infer<typeof createPlaceSchema>
export type UpdatePlace = z.infer<typeof updatePlaceSchema>
