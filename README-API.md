# User Management API

Platform undangan pernikahan digital dengan fitur user management.

## Fitur yang Sudah Dibuat

### API Endpoints

#### Users
- `GET /api/users` - Daftar semua users dengan optional search
- `GET /api/users/[id]` - Detail user berdasarkan ID
- `POST /api/users` - Buat user baru
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Soft delete user

#### Favorites
- `GET /api/favorites?userId=xxx` - Dapatkan semua favorites user
- `POST /api/favorites` - Tambahkan user ke favorites
- `DELETE /api/favorites?userId=xxx&favoritedBy=xxx` - Hapus dari favorites
- `OPTIONS /api/favorites?userId=xxx&favoritedBy=xxx` - Cek apakah user favorit

### Database Schema (SQL)

Lihat `database/schema.sql` untuk skema lengkap.

Database menggunakan SQLite secara default untuk development. Untuk production, ubah `DATABASE_URL` di `.env.local` ke PostgreSQL.

## Setup Environment

1. Copy file env:
```bash
cp .env.example .env.local
```

2. Konfigurasi database:
```bash
# SQLite (development default)
DATABASE_URL=./data/database.sqlite

# atau PostgreSQL
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

3. Install dependencies:
```bash
npm install
```

4. Jalankan server:
```bash
npm run dev
```

## Struktur Folder

```
├── app/
│   ├── api/           # API routes
│   │   ├── users/     # User CRUD
│   │   └── favorites/ # Favorites management
│   ├── users/         # User pages
│   └── favorites/     # Favorites page
├── components/        # React components
├── context/           # React contexts
├── lib/               # Libraries (db, api, utils, types)
├── database/          # Database schema
└── scripts/           # Helper scripts
```

## Demo Users

Data awal sudah ada di database:
- Andi Saputra (PT Maju Kreatif)
- Budi Santoso (CV Mandiri Digital)
- Citra Dewi (StartUp Lokal)
- Dian Permata (Freelance Designer)
- dll

## API Usage Examples

### Create User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","company":"Company ABC"}'
```

### Search Users
```bash
curl "http://localhost:3000/api/users?search=Andi"
```

### Add to Favorites
```bash
curl -X POST http://localhost:3000/api/favorites \
  -H "Content-Type: application/json" \
  -d '{"userId":"user-uuid","favoritedBy":"current-user"}'
```

### Get Favorites
```bash
curl "http://localhost:3000/api/favorites?userId=current-user"
```