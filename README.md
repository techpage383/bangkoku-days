# Site Bang - Bangkok Portal for Japanese Residents

A fully custom portal site for Japanese residents in Bangkok, built with Next.js, focusing on lifestyle information, store discovery, and community interaction.

## 🎯 Project Status

### ✅ Completed (Backend)
- Complete database schema with Prisma
- RESTful API endpoints (v1)
- Authentication & authorization (NextAuth.js)
- Role-based access control
- Multilingual support (ja/en/th)
- Input validation (Zod)
- Error handling
- Admin APIs for content management

### ❌ Not Implemented
- Stripe payment integration
- Image upload (R2/S3)
- Email notifications
- Meilisearch integration
- Frontend UI (admin panel & public site)
- Caching (Redis)
- Rate limiting

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your credentials

# Setup database
npx prisma migrate dev --name init
npx prisma generate

# Create admin user
npx tsx scripts/create-admin.ts

# Seed sample data (optional)
npx tsx scripts/seed.ts

# Start development server
npm run dev
```

Visit http://localhost:3000

## 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Get started in 5 minutes
- **[BACKEND_SETUP.md](./BACKEND_SETUP.md)** - Detailed backend guide
- **[API_DOCS.md](./API_DOCS.md)** - Complete API reference

## 🏗️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Validation**: Zod
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI, shadcn
- **Forms**: React Hook Form
- **Rich Text**: Tiptap
- **Payments**: Stripe (not implemented)
- **Search**: Meilisearch (not integrated)

## 📁 Project Structure

```
app/
├── api/
│   ├── auth/[...nextauth]/     # Authentication
│   └── v1/                     # API routes
│       ├── places/             # Store listings
│       ├── articles/           # News & guides
│       ├── community/          # BBS & Q&A
│       ├── inquiries/          # Contact forms
│       └── admin/              # Admin APIs
lib/
├── prisma.ts                   # Database client
├── auth.ts                     # Auth helpers
├── password.ts                 # Password hashing
├── errors.ts                   # Error handling
├── api-response.ts             # Response utilities
└── validations/                # Zod schemas
prisma/
└── schema.prisma               # Database schema
scripts/
├── create-admin.ts             # Admin creation
└── seed.ts                     # Sample data
```

## 🔐 Authentication

The system uses NextAuth.js with role-based access:

- **SUPER_ADMIN**: Full system access
- **ADMIN**: Content management + moderation
- **EDITOR**: Content creation only

## 🌐 Multilingual Support

All content supports three languages:
- Japanese (ja)
- English (en)
- Thai (th)

URL structure: `/{locale}/path`

## 📊 Database Schema

Core tables:
- `admin_users` - Admin authentication
- `places` + `place_translations` - Store listings
- `articles` + `article_translations` - News/guides
- `community_posts` + `community_replies` - Community
- `areas`, `categories`, `tags` - Taxonomy
- `inquiries` - Contact forms
- `media` - File uploads

## 🔌 API Endpoints

### Public APIs
- `GET /api/v1/places` - List places
- `GET /api/v1/articles` - List articles
- `GET /api/v1/community/posts` - List posts
- `POST /api/v1/inquiries` - Submit inquiry

### Admin APIs (Protected)
- `GET /api/v1/admin/dashboard` - Stats
- `POST /api/v1/admin/places` - Create place
- `PATCH /api/v1/admin/community` - Moderate
- `GET /api/v1/admin/users` - Manage admins

See [API_DOCS.md](./API_DOCS.md) for complete reference.

## 🧪 Testing

```bash
# Login
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@sitebang.com","password":"admin123456"}'

# Get places
curl http://localhost:3000/api/v1/places?locale=ja&page=1
```

## 🛠️ Development

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npx prisma studio    # Open database GUI
```

## 📝 Environment Variables

```env
DATABASE_URL="postgresql://user:password@localhost:5432/sitebang"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

## 🎯 Next Steps

1. Build admin panel UI
2. Build public site pages
3. Implement image upload
4. Add Stripe integration
5. Setup email notifications
6. Integrate Meilisearch
7. Add caching layer
8. Deploy to production

## 📄 License

Private project for freelance client.

## 🤝 Contributing

This is a private project. Contact the project owner for access.
