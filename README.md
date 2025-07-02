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
| Chat        | WebSocket + Threaded Replies  |
| Database    | MySQL (local)                 |
| DevOps      | Docker + Docker Compose       |

---

## 🔶️ Requirements

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

### Option A: Docker (Recommended)

1. Clone the Repo:
```bash
git clone https://github.com/JaysonCalbario/jayson-todo-list-app.git
cd jayson-todo-list-app
```

2. Go to `todo-docker/` directory and start containers:
```bash
cd todo-docker
docker-compose up -d
```

3. Check Container Status:
```bash
docker ps
```

You should see running services like:
- `todo-api`
- `todo-mysql`
- `todo-soketi`
- `todo-nginx`
- `todo-phpmyadmin`
- `todo-portainer`

4. (Optional) Initialize MySQL manually:
```bash
docker exec -it todo-mysql bash
mysql -u root -p
```
Inside MySQL:
```sql
CREATE DATABASE todo_db;
CREATE USER 'todo_user'@'%' IDENTIFIED BY 'secret';
GRANT ALL PRIVILEGES ON todo_db.* TO 'todo_user'@'%';
FLUSH PRIVILEGES;
```

5. Access the app:
- Backend API: [http://localhost:8000](http://localhost:8000) (via Nginx)
- Frontend: [http://localhost:3000](http://localhost:3000)
- PHPMyAdmin: [http://localhost:8080](http://localhost:8080)
- Portainer: [http://localhost:9000](http://localhost:9000)

**Docker Locations:**
- Laravel Dockerfile: `backend/docker/Dockerfile`
- Docker Compose config: `todo-docker/docker-compose.yml`

---

### Option B: Manual Setup (No Docker)

1. Start MySQL manually and create database/user:
```sql
CREATE DATABASE todo_db;
CREATE USER 'todo_user'@'%' IDENTIFIED BY 'secret';
GRANT ALL PRIVILEGES ON todo_db.* TO 'todo_user'@'%';
FLUSH PRIVILEGES;
```

2. Backend (Laravel):
```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
```

Update `.env`:
```env
APP_URL=http://127.0.0.1:8000
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=todo_db
DB_USERNAME=todo_user
DB_PASSWORD=secret

BROADCAST_DRIVER=pusher
PUSHER_APP_ID=app-id
PUSHER_APP_KEY=app-key
PUSHER_APP_SECRET=app-secret
PUSHER_HOST=127.0.0.1
PUSHER_PORT=6001
PUSHER_SCHEME=http
PUSHER_APP_CLUSTER=mt1
```
Then:
```bash
php artisan migrate
php artisan serve --host=0.0.0.0 --port=8000
```
API will be available at [http://127.0.0.1:8000](http://127.0.0.1:8000)

3. WebSockets (Soketi):
```bash
npm install -g @soketi/soketi
soketi start
```

4. Frontend (Next.js):
```bash
cd ../frontend
npm install
```
Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
NEXT_PUBLIC_PUSHER_KEY=app-key
NEXT_PUBLIC_PUSHER_CLUSTER=mt1
NEXT_PUBLIC_SOCKET_HOST=127.0.0.1
NEXT_PUBLIC_SOCKET_PORT=6001
```
Then:
```bash
npm run dev
```
Frontend will run at: [http://localhost:3000](http://localhost:3000)

---

## 📊 Features

### ✅ TODO App
- Add, edit, delete todos
- Reorder via drag-and-drop
- Filter: All / Active / Completed
- Real-time sync across tabs/devices

### 💬 Chat App
- Real-time WebSocket messaging
- Emoji picker with insert-at-cursor
- Stylish glassmorphic + gradient UI
- User avatars and sender IDs

---

## 📁 Folder Structure

```
jayson-todo-list-app/
├── backend/         # Laravel API
│   └── docker/      # Laravel Dockerfile location
├── frontend/        # Next.js client (TODO + Chat)
├── todo-docker/     # Docker Compose setup
│   └── docker-compose.yml
```

---

## 🧑‍💻 Author

Built with ❤️ by **Jayson Calbario**

> Contributions welcome!
