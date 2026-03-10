# Sarang-Pulse: Unified Operations Dashboard

## Project Overview

Sarang-Pulse is a professional-grade Unified Operations Dashboard developed for Sarang Infotech as part of an internship project. This MERN stack application provides real-time monitoring and management capabilities for operational tasks, employee tracking, and system health metrics. The dashboard features a modern dark-themed UI built with React and Tailwind CSS, offering seamless navigation and interactive data visualization.

## Tech Stack

### MERN Stack Components
- **MongoDB Atlas**: Cloud-hosted NoSQL database for scalable data storage
- **Express.js**: Backend web application framework for Node.js
- **React**: Frontend library for building user interfaces with hooks and functional components
- **Node.js**: JavaScript runtime for server-side development

### Key Libraries & Tools
- **Axios**: HTTP client for API communication between frontend and backend
- **CORS**: Cross-Origin Resource Sharing middleware for secure API access
- **Concurrently**: Tool for running multiple development servers simultaneously
- **Tailwind CSS**: Utility-first CSS framework for modern, responsive UI design
- **Mongoose**: ODM for MongoDB data modeling and validation
- **JWT**: JSON Web Tokens for secure authentication (prepared for future implementation)

## Features

### Core Functionalities
- **Sidebar Navigation**: Intuitive navigation between Dashboard, Tasks, Employees, and Reports sections
- **Real-time Dashboard Stats**: Live data cards displaying Total Users, Active Projects, Revenue, and System Health
- **Full CRUD Operations**: Complete Create, Read, Update, Delete functionality for operational tasks
- **Interactive Data Table**: Searchable and paginated table for task management with Add/Delete capabilities
- **Responsive Design**: Mobile-friendly interface with dark corporate theme
- **Concurrent Development**: Simultaneous frontend and backend server management

### Technical Features
- **RESTful API Design**: Clean API endpoints following REST conventions
- **Modular Architecture**: Separated frontend and backend with organized folder structures
- **Environment Configuration**: Secure environment variable management for sensitive data
- **Error Handling**: Comprehensive error handling for API calls and user interactions

## How It Works

### Communication Flow

1. **Frontend (React - Port 3001)**:
   - User interacts with the dashboard interface
   - React components make HTTP requests using Axios
   - Data is displayed with loading states and error handling

2. **Backend (Node.js/Express - Port 5000)**:
   - Receives API requests from frontend
   - Processes business logic through controllers
   - Interacts with MongoDB Atlas for data operations
   - Returns JSON responses with appropriate CORS headers

3. **Database (MongoDB Atlas)**:
   - Stores operational data including tasks, users, and metrics
   - Provides cloud-based scalability and reliability
   - Secured with authentication and access controls

### Data Flow Example
```
User Action → React Component → Axios Request → Express Route → Controller → Mongoose Model → MongoDB Atlas → Response → UI Update
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- MongoDB Atlas account (for cloud database)

### Step-by-Step Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd c:/Users/Admin/Downloads/Project_sarang
   ```

2. **Install root dependencies**:
   ```bash
   npm install
   ```

3. **Install backend dependencies**:
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Install frontend dependencies**:
   ```bash
   cd frontend
   npm install
   cd ..
   ```

5. **Configure environment variables**:
   - Update `backend/.env` with your MongoDB Atlas connection string:
     ```
     MONGO_URI=mongodb+srv://panzer_admin:panzer124421@cluster0.g6jwjbx.mongodb.net/?appName=Cluster0
     JWT_SECRET=your_jwt_secret_key_here
     PORT=5000
     ```
   - Update `frontend/.env` (already configured):
     ```
     PORT=3001
     ```

## How to Start

### Development Mode
To start both frontend and backend servers simultaneously:

```bash
# Normal start (recommended)
npm run dev

# Or if ports are busy, use clean start
npm run clean-start
```

This command will:
- Kill any processes on ports 3000, 3001, and 5000
- Start the backend server on port 5000 (blue logs)
- Start the frontend server on port 3001 (green logs)

### Access the Application
- **Frontend Dashboard**: http://localhost:3001
- **Backend API**: http://localhost:5000

### Available Scripts
- `npm run dev`: Start both servers concurrently
- `npm run clean-start`: Kill port processes and restart servers
- `npm start --prefix backend`: Start backend only
- `npm start --prefix frontend`: Start frontend only

## Contributors

- **Het Naik**: Lead Developer - Full-stack implementation, MERN stack integration, UI/UX design
- **Collaborative Partner**: Co-developer - Backend API development, database modeling, testing

---

**Sarang Infotech Internship Project** | Developed with ❤️ using MERN Stack
