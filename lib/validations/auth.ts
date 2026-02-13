import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const createAdminSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
  role: z.enum(['SUPER_ADMIN', 'ADMIN', 'EDITOR']).default('EDITOR'),
})

export const updateAdminSchema = z.object({
  name: z.string().min(1).optional(),
  role: z.enum(['SUPER_ADMIN', 'ADMIN', 'EDITOR']).optional(),
  active: z.boolean().optional(),
})

export type Login = z.infer<typeof loginSchema>
export type CreateAdmin = z.infer<typeof createAdminSchema>
export type UpdateAdmin = z.infer<typeof updateAdminSchema>
