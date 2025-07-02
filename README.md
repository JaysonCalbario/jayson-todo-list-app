
📜 Full-Stack TODO App (Laravel + Next.js + Soketi + MySQL + Docker)

A modern TODO list application with:

✅ Laravel REST API

✅ Real-time updates via Soketi + Laravel Echo

✅ Drag-and-drop (DnD) with @dnd-kit

✅ Beautiful frontend in Next.js + Tailwind CSS

✅ MySQL database (local)

✅ Docker support for local development

⚙️ Tech Stack

Layer

Tech

Frontend

Next.js + Tailwind CSS

Backend API

Laravel 10

WebSockets

Soketi + Laravel Echo

Database

MySQL (local)

DevOps

Docker + Docker Compose

📆 Requirements

Node.js ≥ 18.x

PHP ≥ 8.1

Composer

MySQL

Laravel Echo client

Soketi (npm i -g @soketi/soketi)

Docker + Docker Compose (for optional containerization)

Git

🗓️ Setup Instructions

1. Clone the Repo

[git clone gh repo clone JaysonCalbario/jayson-todo-list-app]
https://github.com/JaysonCalbario/jayson-todo-list-app.git
cd todo-app

2. Backend (Laravel API)

cd backend
cp .env.example .env
composer install
php artisan key:generate

Update .env:

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=todo_db
DB_USERNAME=root
DB_PASSWORD=secret

BROADCAST_DRIVER=pusher

PUSHER_APP_ID=local
PUSHER_APP_KEY=local
PUSHER_APP_SECRET=local
PUSHER_HOST=127.0.0.1
PUSHER_PORT=6001
PUSHER_SCHEME=http
PUSHER_APP_CLUSTER=local

Then:

php artisan migrate
php artisan serve

API now running at: http://127.0.0.1:8000

3. WebSockets (Soketi)

Install if not yet:

npm install -g @soketi/soketi

Run it:

soketi start

Make sure it's listening on port 6001

4. Frontend (Next.js)

cd ../frontend
npm install

Create .env.local:

NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
NEXT_PUBLIC_PUSHER_KEY=local
NEXT_PUBLIC_PUSHER_CLUSTER=local
NEXT_PUBLIC_SOCKET_HOST=127.0.0.1
NEXT_PUBLIC_SOCKET_PORT=6001

Then start the dev server:

npm run dev

App now at: http://localhost:3000

🐳 Optional: Run with Docker

To spin up MySQL and optionally run Laravel services:

docker-compose up -d

Example docker-compose.yml might include services for:

MySQL database

Soketi (WebSocket server)

Laravel (as artisan serve or Nginx)

You can customize .env values accordingly.

✅ Features

### ✅ TODO App
- Add, edit, delete todos
- Reorder via drag-and-drop
- Filter: All / Active / Completed
- Real-time sync across tabs/devices

### 💬 Chat App
- Real-time WebSocket messaging
- Threaded replies (like Messenger)
- Emoji picker with insert-at-cursor
- Stylish glassmorphic + gradient UI
- User avatars and sender IDs


📁 Folder Structure

jayson-todo-list-app/
├── backend/      # Laravel API
├── frontend/     # Next.js client
└── docker/       # Optional Docker files and config

🧑‍💻 Author

Built by Jayson Calbario
=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started to run this web file or the frontend

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

