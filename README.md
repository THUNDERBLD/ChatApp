# 💬 ChatApp

A full-stack real-time chat application built with **TypeScript**, featuring a decoupled **Backend** API server and a modern **Frontend** client.

---

## 🚀 Features

- 🔴 **Real-time messaging** powered by WebSockets / Socket.IO
- 🔐 **User authentication** — register and log in securely
- 🗂️ **Room / conversation management** — create and join chat rooms
- 📦 **Monorepo structure** — Backend and Frontend in a single repository
- ⚡ **TypeScript throughout** — type-safe codebase on both ends

---

## 🛠️ Tech Stack

| Layer     | Technology                              |
|-----------|-----------------------------------------|
| Language  | TypeScript / JavaScript                 |
| Backend   | Node.js, Express.js, Socket.IO          |
| Frontend  | React (TypeScript)                      |
| Database  | MongoDB / Mongoose (or similar)         |
| Auth      | JWT (JSON Web Tokens)                   |

---

## 📁 Project Structure

```
ChatApp/
├── Backend/          # Node.js + Express REST API & WebSocket server
│   ├── src/
│   │   ├── controllers/   # Route logic
│   │   ├── models/        # Database schemas
│   │   ├── routes/        # API route definitions
│   │   ├── sockets/       # Socket.IO event handlers
│   │   └── index.ts       # Server entry point
│   └── package.json
│
└── Frontend/         # React client application
    ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page-level views
│   │   ├── store/         # State management
│   │   └── App.tsx        # Root component
    └── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A running MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

---

### 1. Clone the Repository

```bash
git clone https://github.com/THUNDERBLD/ChatApp.git
cd ChatApp
```

---

### 2. Set Up the Backend

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend/` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/chatapp
JWT_SECRET=your_jwt_secret_here
```

Start the backend server:

```bash
npm run dev
```

The server will be running at `http://localhost:5000`.

---

### 3. Set Up the Frontend

Open a new terminal tab/window:

```bash
cd Frontend
npm install
```

Create a `.env` file in the `Frontend/` directory:

```env
REACT_APP_API_URL=http://localhost:5000
```

Start the frontend development server:

```bash
npm start
```

The app will open at `http://localhost:3000`.

---

## 🔌 API Overview

| Method | Endpoint             | Description              |
|--------|----------------------|--------------------------|
| POST   | `/api/auth/register` | Register a new user      |
| POST   | `/api/auth/login`    | Log in and receive a JWT |
| GET    | `/api/rooms`         | List all chat rooms      |
| POST   | `/api/rooms`         | Create a new chat room   |
| GET    | `/api/messages/:id`  | Fetch messages for a room|

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to your branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**THUNDERBLD** — [@THUNDERBLD](https://github.com/THUNDERBLD)
