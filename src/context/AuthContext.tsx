'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type User = {
  email: string
  name: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => boolean
  register: (email: string, name: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = (email: string, password: string) => {
    // Simulación de validación
    if (password.length < 6) {
      return false
    }

    setUser({
      email,
      name: email.split('@')[0]
    })
    return true
  }

  const register = (email: string, name: string, password: string) => {
    // Simulación de validación
    if (password.length < 6 || !email.includes('@')) {
      return false
    }

    setUser({
      email,
      name
    })
    return true
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}