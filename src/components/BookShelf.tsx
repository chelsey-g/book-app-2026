'use client'

import { useState, useEffect } from 'react'
import type { Book, UserBook } from '@/types/database'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'

const BookShelf: React.FC = () => {
  const [userBooks, setUserBooks] = useState<(UserBook & { book: Book })[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'want_to_read' | 'reading' | 'read' | 'dnf'>('all')
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchUserBooks()
    }
  }, [user, filter])

  const fetchUserBooks = async () => {
    setLoading(true)
    
    if (!supabase || !user) {
      setLoading(false)
      return
    }
    
    try {
      const query = supabase
        .from('user_books')
        .select(`
          *,
          book:books(*)
        `)
        .eq('user_id', user?.id)
      
      if (filter !== 'all') {
        query.eq('status', filter)
      }
      
      const { data, error } = await query
      
      if (error) throw error
      setUserBooks(data || [])
    } catch (error: any) {
      console.error('Error fetching user books:', error.message)
    } finally {
      setLoading(false)
    }
  }

  const updateBookStatus = async (userBookId: string, newStatus: UserBook['status']) => {
    if (!supabase) return
    
    try {
      const updates: Partial<UserBook> = { status: newStatus }
      
      if (newStatus === 'reading') {
        updates.start_date = new Date().toISOString()
      } else if (newStatus === 'read' && !userBooks.find(ub => ub.id === userBookId)?.finish_date) {
        updates.finish_date = new Date().toISOString()
      }
      
      const { error } = await supabase
        .from('user_books')
        .update(updates)
        .eq('id', userBookId)
      
      if (error) throw error
      
      fetchUserBooks()
    } catch (error: any) {
      console.error('Error updating book status:', error.message)
    }
  }

  const updateProgress = async (userBookId: string, progress: number) => {
    if (!supabase) return
    
    try {
      const { error } = await supabase
        .from('user_books')
        .update({ progress })
        .eq('id', userBookId)
      
      if (error) throw error
      
      setUserBooks(prev => 
        prev.map(ub => 
          ub.id === userBookId ? { ...ub, progress } : ub
        )
      )
    } catch (error: any) {
      console.error('Error updating progress:', error.message)
    }
  }

  const updateRating = async (userBookId: string, rating: number) => {
    if (!supabase) return
    
    try {
      const { error } = await supabase
        .from('user_books')
        .update({ rating })
        .eq('id', userBookId)
      
      if (error) throw error
      
      setUserBooks(prev => 
        prev.map(ub => 
          ub.id === userBookId ? { ...ub, rating } : ub
        )
      )
    } catch (error: any) {
      console.error('Error updating rating:', error.message)
    }
  }

  const filteredBooks = filter === 'all' ? userBooks : userBooks.filter(ub => ub.status === filter)

  if (loading) {
    return <div className="flex justify-center p-8">Loading your books...</div>
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Bookshelf</h2>
      
      <div className="flex gap-2 mb-6">
        {['all', 'want_to_read', 'reading', 'read', 'dnf'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status as any)}
            className={`px-4 py-2 rounded-md ${
              filter === status
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((userBook) => (
          <div key={userBook.id} className="border rounded-lg p-4 shadow-sm">
            {userBook.book.cover_url && (
              <img
                src={userBook.book.cover_url}
                alt={userBook.book.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}
            
            <h3 className="font-semibold text-lg mb-1">{userBook.book.title}</h3>
            <p className="text-gray-600 mb-3">{userBook.book.author}</p>
            
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Status:</label>
              <select
                value={userBook.status}
                onChange={(e) => updateBookStatus(userBook.id, e.target.value as UserBook['status'])}
                className="w-full px-3 py-1 border border-gray-300 rounded-md text-sm"
              >
                <option value="want_to_read">Want to Read</option>
                <option value="reading">Reading</option>
                <option value="read">Read</option>
                <option value="dnf">Did Not Finish</option>
              </select>
            </div>
            
            {userBook.status === 'reading' && (
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">
                  Progress: {userBook.progress}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={userBook.progress}
                  onChange={(e) => updateProgress(userBook.id, parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            )}
            
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Rating:</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => updateRating(userBook.id, star)}
                    className={`text-2xl ${
                      star <= (userBook.rating || 0) ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            
            {userBook.review && (
              <div className="text-sm text-gray-600 italic">
                "{userBook.review.substring(0, 100)}{userBook.review.length > 100 ? '...' : ''}"
              </div>
            )}
          </div>
        ))}
      </div>
      
      {filteredBooks.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No books found. {filter === 'all' ? 'Start by adding some books!' : `No books with status "${filter.replace('_', ' ')}".`}
        </div>
      )}
    </div>
  )
}

export default BookShelf