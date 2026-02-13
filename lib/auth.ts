import { getServerSession } from "next-auth"
import { errors } from "./errors"

export const getSession = () => getServerSession()

export const requireAuth = async () => {
  const session = await getSession()
  if (!session?.user) throw errors.unauthorized()
  return session
}

export const requireRole = async (allowedRoles: string[]) => {
  const session = await requireAuth()
  if (!allowedRoles.includes(session.user.role)) throw errors.forbidden()
  return session
}

