# 🧠 Smart Task Manager

A modern and scalable **Task Management System** built using:

- **Next.js 14 (App Router)**
- **MongoDB + Mongoose**
- **TypeScript**
- **Server Actions**
- **Zod Validation**
- **ShadCN UI**
- **Tailwind CSS**

This application allows users to manage **Teams**, **Projects**, and **Tasks** with secure authentication and optimized workflow.

---

## 🚀 Features

### 🔐 Authentication

- Secure login using **JWT**
- Password hashing using **bcrypt**
- API protection via **Server Actions**

### 👥 Team Management

- Create, update, delete teams
- Teams linked to authenticated users
- Zod validation on the server

### 📁 Project Management

- Create projects under teams
- Populate related team details on fetch
- Full CRUD using **Server Actions**

### ✅ Task Management

- Create, update, delete tasks
- Assign tasks to teams & projects

### 🧱 Technical Highlights

- **Server Actions** for backend logic
- **Mongoose** models
- **Lean queries** for performance
- **ShadCN UI** components
- **App Router** architecture

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/ahadahamedakash/smart-task-manager.git
cd smart-task-manager
```

### 2. Install Dependencies

````bash
npm install
🔧 Environment Variables
Create a .env file and add:

```bash
# MongoDB database connection string
MONGODB_URI=

# Salt rounds for bcrypt password hashing
BCRYPT_SALT_ROUND=

# Secret key for signing JWT tokens
JWT_SECRET=

# JWT expiry time (e.g., "1d", "7d", "12h")
JWT_EXPIRES_IN=
````

## 📝 Environment Variable

```
MONGODB_URI	MongoDB connection URL
BCRYPT_SALT_ROUND	Number of bcrypt hashing rounds
JWT_SECRET	Secret key for JWT signing
JWT_EXPIRES_IN	Duration before JWT expires
```

## ▶️ Run the Development Server

```
npm run dev
App will run at:

http://localhost:3000
```

🗂 Project Structure

src/
├── app/ # Routes & pages (App Router)
├── components/ # UI + Shared Components
├── lib/
│ ├── db.ts # MongoDB connection
│ ├── action.ts # Auth helper logic
│ ├── validation.ts # Zod schemas
│ ├── models/ # Mongoose models
│ └── utils/ # Utility functions
├── styles/ # Tailwind configuration

## 🧪 Server Actions Overview

### Team Actions

- createTeamAction

- getTeamsAction

- updateTeam

- deleteTeam

### Project Actions

- createProjectAction

- getProjectsAction

### Core Patterns Used

- Validate form data using Zod

- Get session via getSession()

- Connect DB using dbConnect()

- Use revalidatePath() to refresh UI
