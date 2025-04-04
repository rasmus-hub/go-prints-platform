'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import { useAuth } from '@/context/AuthContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (login(email, password)) {
      router.push('/productos')
    } else {
      setError('Credenciales inválidas (prueba con contraseña de 6+ caracteres)')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-200">
      <div className="bg-dark-300 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-light-100">Iniciar Sesión</h1>
        
        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-light-200 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-dark-200 border border-dark-100 rounded-md text-light-100"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-light-200 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-dark-200 border border-dark-100 rounded-md text-light-100"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-colors"
          >
            Ingresar
          </button>
        </form>

        <div className="mt-4 text-center text-light-200">
          ¿No tienes cuenta?{' '}
          <Link href="/registro" className="text-primary hover:underline">
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  )
}