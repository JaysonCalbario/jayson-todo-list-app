
# 📜 Full-Stack TODO + Chat App (Laravel + Next.js + Soketi + MySQL + Docker)

A modern TODO list application bundled with a fully-featured real-time chat app:

✅ Laravel REST API  
✅ Real-time updates via Soketi + Laravel Echo  
✅ Threaded chat replies (Messenger-style)  
✅ Emoji support  
✅ Drag-and-drop (DnD) with `@dnd-kit`  
✅ Beautiful frontend in Next.js + Tailwind CSS  
✅ MySQL database (local)  
✅ Docker support for local development

---

## ⚙️ Tech Stack

| Layer       | Tech                          |
|-------------|-------------------------------|
| Frontend    | Next.js + Tailwind CSS        |
| Backend API | Laravel 10                    |
| WebSockets  | Soketi + Laravel Echo         |
| Chat        | WebSocket 
| Database    | MySQL (local)                 |
| DevOps      | Docker + Docker Compose       |

---

## 🗶️ Requirements

- Node.js ≥ 18.x  
- PHP ≥ 8.1  
- Composer  
- MySQL  
- Laravel Echo client  
- Soketi (`npm i -g @soketi/soketi`)  
- Docker + Docker Compose (optional)  
- Git

---

## 🗓️ Setup Instructions (Fresh Machine)

### 1. Clone the Repo

```bash
git clone https://github.com/JaysonCalbario/jayson-todo-list-app.git
cd jayson-todo-list-app
```

### 2. Start MySQL (if local)

If you're not using Docker, make sure MySQL is running on `127.0.0.1:3306` and a database named `todo_db` exists. Create it if needed:

```sql
CREATE DATABASE todo_db;
```

> Use the following MySQL user credentials if you're aligning with the backend `.env`:
> 
> ```sql
> CREATE USER 'todo_user'@'%' IDENTIFIED BY 'secret';
> GRANT ALL PRIVILEGES ON todo_db.* TO 'todo_user'@'%';
> FLUSH PRIVILEGES;
> ```

### 3. Backend (Laravel API)

```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
```

Update `.env`:

```env
APP_URL=http://todo-app.local:8000

DB_CONNECTION=mysql
DB_HOST=192.168.68.130
DB_PORT=3306
DB_DATABASE=todo_db
DB_USERNAME=todo_user
DB_PASSWORD=secret

BROADCAST_DRIVER=pusher
PUSHER_APP_ID=app-id
PUSHER_APP_KEY=app-key
PUSHER_APP_SECRET=app-secret
PUSHER_HOST=192.168.68.130
PUSHER_PORT=6001
PUSHER_SCHEME=http
PUSHER_APP_CLUSTER=mt1
```

Then:

```bash
php artisan migrate
php artisan serve
```

API should now be available at: [http://192.168.68.130:8000](http://192.168.68.130:8000)

### 4. WebSockets (Soketi)

```bash
npm install -g @soketi/soketi
soketi start
```

Soketi should be running on `http://192.168.68.130:6001`

### 5. Frontend (Next.js)

```bash
cd ../frontend
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://192.168.68.130:8000/api
NEXT_PUBLIC_PUSHER_KEY=app-key
NEXT_PUBLIC_PUSHER_CLUSTER=mt1
NEXT_PUBLIC_SOCKET_HOST=192.168.68.130
NEXT_PUBLIC_SOCKET_PORT=6001
```

Then start the dev server:

```bash
npm run dev
```

Open: [http://localhost:3000](http://localhost:3000)

---

## 👉 Optional: Docker Setup

To spin up MySQL and Laravel using Docker:

```bash
docker-compose up -d
```

Ensure your `.env` files align with Docker container IPs and ports.

---

## 🗉️ Features

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

---

## 📁 Folder Structure

```
jayson-todo-list-app/
├── backend/      # Laravel API
├── frontend/     # Next.js client (TODO + Chat)
└── docker/       # Optional Docker config
```

---

## 🧑‍💻 Author

Built with ❤️ by **Jayson Calbario**

> Contributions welcome!
