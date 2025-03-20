# Next.js E-commerce Application

A modern, full-stack e-commerce application built with Next.js, GraphQL, Prisma, and NextAuth.

## 🌟 Features

- **Authentication System**

  - OAuth 2.0 with Google
  - Email/password credentials
  - Protected routes and API endpoints
  - Session management

- **Product Management**

  - Product listings with filtering
  - Product details
  - Featured products
  - Product recommendations

- **User Management**

  - User profiles
  - Order history
  - Address management

- **Shopping Experience**

  - Cart functionality
  - Checkout process
  - Order tracking

- **Performance Optimizations**
  - Redis caching
  - Server-side rendering
  - Optimized GraphQL queries

## 🛠️ Tech Stack

- **Frontend**

  - Next.js 15+ (App Router)
  - Apollo Client
  - TypeScript
  - Tailwind CSS
  - shadcn/ui components

- **Backend**

  - GraphQL Yoga server
  - Pothos GraphQL schema builder
  - Prisma ORM
  - PostgreSQL database
  - Redis cache

- **Authentication**
  - NextAuth v4+
  - OAuth 2.0
  - JWT tokens

## 📋 Prerequisites

- Node.js 18.x or later
- PostgreSQL 14.x or later
- Redis (for caching)
- Google OAuth credentials (for social login)

## 🚀 Getting Started

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Tonnie-Exelero/nextjs-ecommerce-app.git
cd nextjs-ecommerce-app
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

```plaintext
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/ecommerce?schema=public

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Redis
UPSTASH_REDIS_REST_URL=your-redis-url
UPSTASH_REDIS_REST_TOKEN=your-redis-token
```

4. Initialize the database:

```bash
npx prisma generate
npx prisma db push
```

5. Seed the database with sample data:

```bash
pnpm run seed
```

6. Start the development server:

```bash
pnpm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.
