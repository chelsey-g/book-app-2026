# Book Tracker (Next.js)

A modern book tracking application built with Next.js, TypeScript, Tailwind CSS, and Supabase. Similar to Goodreads or StoryGraph, this app allows users to track their reading progress, rate books, write reviews, and manage their personal bookshelf.

## Features

- **Authentication**: Sign up and sign in with email/password using Supabase Auth
- **Book Search**: Search for books using Open Library API
- **Bookshelf Management**: Add books to your personal shelf with status tracking
- **Reading Progress**: Track your progress through books (0-100%)
- **Status Management**: Mark books as "Want to Read", "Reading", "Read", or "Did Not Finish"
- **Rating System**: 5-star rating system for books you've read
- **Reviews**: Write and edit reviews for your books
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Type Safety**: Full TypeScript implementation
- **Modern Stack**: Built with Next.js 16, React 19, and Tailwind CSS v4

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4
- **Backend**: Supabase (Authentication + Database)
- **Testing**: Jest + React Testing Library + jsdom
- **External API**: Open Library API for book search
- **Deployment**: Ready for Vercel deployment

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun
- A Supabase account and project

### Installation

1. Clone the repository and install dependencies:
```bash
cd book-tracker-nextjs
npm install
```

2. Set up Supabase:
   - Create a new project in your Supabase dashboard
   - Run the SQL schema from `supabase/migration.sql` in your Supabase SQL editor
   - Enable authentication in your Supabase project settings
   - Get your project URL and anon key from Supabase settings

3. Create environment variables:
```bash
cp .env.local.example .env.local
```

4. Fill in your Supabase credentials in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

5. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Project Structure

```
src/
├── app/                # Next.js App Router pages
│   ├── page.tsx       # Home/login page
│   ├── shelf/page.tsx # Bookshelf page
│   ├── search/page.tsx # Book search page
│   └── auth/
│       └── signout/page.tsx
├── components/          # React components
│   ├── AuthForm.tsx     # Login/Signup form
│   ├── BookSearch.tsx   # Book search functionality
│   └── BookShelf.tsx    # Main bookshelf display
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state management
├── lib/               # Utility libraries
│   └── supabase.ts      # Supabase client configuration
├── types/             # TypeScript type definitions
│   └── database.ts    # Database type definitions
└── __tests__/          # Test files
    └── AuthForm.test.tsx
```

## Database Schema

The app uses the following Supabase tables:

- **profiles**: User profiles with username, full name, and avatar
- **books**: Book information (title, author, ISBN, description, cover, etc.)
- **user_books**: Junction table tracking user's relationship with books (status, rating, review, progress)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run Jest tests

## Testing

Run tests with:
```bash
npm test
```

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `.next` folder.

## Deployment

The app is optimized for Vercel deployment:

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

You can also deploy to other platforms that support Next.js applications.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## Future Enhancements

- Book recommendations based on reading history
- Reading goals and statistics dashboard
- Social features (following friends, seeing what others are reading)
- Book clubs functionality
- Import/export reading data
- Dark mode support
- Mobile app (React Native)
