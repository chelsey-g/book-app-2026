export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      books: {
        Row: {
          id: string
          title: string
          author: string
          isbn: string | null
          description: string | null
          cover_url: string | null
          page_count: number | null
          published_date: string | null
          genres: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          author: string
          isbn?: string | null
          description?: string | null
          cover_url?: string | null
          page_count?: number | null
          published_date?: string | null
          genres?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          author?: string
          isbn?: string | null
          description?: string | null
          cover_url?: string | null
          page_count?: number | null
          published_date?: string | null
          genres?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      user_books: {
        Row: {
          id: string
          user_id: string
          book_id: string
          status: 'want_to_read' | 'reading' | 'read' | 'dnf'
          rating: number | null
          review: string | null
          progress: number
          start_date: string | null
          finish_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          book_id: string
          status: 'want_to_read' | 'reading' | 'read' | 'dnf'
          rating?: number | null
          review?: string | null
          progress?: number
          start_date?: string | null
          finish_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          book_id?: string
          status?: 'want_to_read' | 'reading' | 'read' | 'dnf'
          rating?: number | null
          review?: string | null
          progress?: number
          start_date?: string | null
          finish_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export type Book = Database['public']['Tables']['books']['Row']
export type UserBook = Database['public']['Tables']['user_books']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']
export type BookStatus = UserBook['status']