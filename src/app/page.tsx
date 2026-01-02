'use client'

import { useAuth } from '@/contexts/AuthContext'
import AuthForm from '@/components/AuthForm'

export default function Home() {
  const { user } = useAuth()

  if (!user) {
    return <AuthForm />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900">Book Tracker</h1>
            
            <nav className="flex gap-4">
              <a
                href="/shelf"
                className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                My Shelf
              </a>
              <a
                href="/search"
                className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Add Books
              </a>
            </nav>
            
            <a
              href="/auth/signout"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Sign Out
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Welcome to Book Tracker!</h2>
          <p className="text-gray-600 mb-8">
            Start tracking your reading journey by adding books to your shelf.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/shelf"
              className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              View My Shelf
            </a>
            <a
              href="/search"
              className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Add Books
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
