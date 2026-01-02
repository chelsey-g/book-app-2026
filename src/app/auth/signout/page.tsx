'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useEffect } from 'react'

export default function SignOutPage() {
  const router = useRouter()
  const { signOut } = useAuth()

  useEffect(() => {
    const handleSignOut = async () => {
      await signOut()
      router.push('/')
    }
    
    handleSignOut()
  }, [router, signOut])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <p className="text-gray-600 mb-4">Signing out...</p>
      </div>
    </div>
  )
}