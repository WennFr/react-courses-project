import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './useAuth'

export function RequireAuthentication({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />
}

export function RequireTeacher({ children }: { children: ReactNode }) {
  const { isAuthenticated, isTeacher } = useAuth()

  if (!isAuthenticated) return <Navigate to="/" replace />
  return isTeacher ? <>{children}</> : <Navigate to="/courses" replace />
}
