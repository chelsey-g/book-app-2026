'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

interface BookSearchProps {}

const BookSearch: React.FC<BookSearchProps> = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  const searchBooks = async () => {
    if (!searchQuery.trim()) return
    
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}&limit=10`
      )
      
      if (!response.ok) throw new Error('Failed to search books')
      
      const data = await response.json()
      setSearchResults(data.docs || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const addBookToShelf = async (bookData: any) => {
    if (!user || !supabase) return
    
    try {
      const { data: existingBooks } = await supabase
        .from('books')
        .select('id')
        .eq('isbn', bookData.isbn?.[0] || '')
        .single()
      
      let bookId
      
      if (existingBooks) {
        bookId = existingBooks.id
      } else {
        const { data: newBook, error: bookError } = await supabase
          .from('books')
          .insert({
            title: bookData.title,
            author: bookData.author_name?.[0] || 'Unknown',
            isbn: bookData.isbn?.[0] || null,
            description: bookData.first_sentence?.[0] || null,
            page_count: bookData.number_of_pages_median || null,
            published_date: bookData.first_publish_year ? new Date(bookData.first_publish_year, 0, 1).toISOString() : null,
            genres: bookData.subject || null,
            cover_url: bookData.cover_i ? `https://covers.openlibrary.org/b/id/${bookData.cover_i}-M.jpg` : null,
          })
          .select()
          .single()
        
        if (bookError) throw bookError
        bookId = newBook.id
      }
      
      const { error: userBookError } = await supabase
        .from('user_books')
        .insert({
          user_id: user.id,
          book_id: bookId,
          status: 'want_to_read',
        })
      
      if (userBookError) throw userBookError
      
      alert('Book added to your shelf!')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Add Books to Your Shelf</h2>
      
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && searchBooks()}
          placeholder="Search by title, author, or ISBN..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={searchBooks}
          disabled={loading || !searchQuery.trim()}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div className="space-y-4">
        {searchResults.map((book) => (
          <div key={book.key} className="border rounded-lg p-4 flex gap-4">
            {book.cover_i && (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
                className="w-20 h-28 object-cover rounded"
              />
            )}
            
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{book.title}</h3>
              <p className="text-gray-600 mb-2">
                by {book.author_name?.join(', ') || 'Unknown'}
              </p>
              {book.first_publish_year && (
                <p className="text-sm text-gray-500 mb-2">
                  Published: {book.first_publish_year}
                </p>
              )}
              {book.first_sentence?.[0] && (
                <p className="text-sm text-gray-700 mb-2 italic">
                  "{book.first_sentence[0]}"
                </p>
              )}
            </div>
            
            <button
              onClick={() => addBookToShelf(book)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 self-start"
            >
              Add to Shelf
            </button>
          </div>
        ))}
      </div>
      
      {!loading && searchResults.length === 0 && searchQuery && (
        <p className="text-center text-gray-500 mt-8">No books found. Try a different search term.</p>
      )}
    </div>
  )
}

export default BookSearch