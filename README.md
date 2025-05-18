# Task Manager Backend

## Features

- Google OAuth 2.0 Login
- Task CRUD (Create, Read, Update, Delete)
- PDF Report Generation for Tasks
- Protected routes using session-based authentication

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Passport.js (Google OAuth)
- PDFKit

## Setup Instructions

1. Clone the repo and navigate to `backend/` folder:

```bash
cd backend
```

2. Install dependencies:

``` bash
npm install
```

3. Create a .env file in backend:

``` bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/task-manager
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SESSION_SECRET=your_cookie_session_secret
```

4. Run the server:

``` bash
npm run dev
```

# Task Manager Frontend

## Features

- Google OAuth login integration
- Dashboard with task summary
- View, Add, Edit, and Delete tasks
- Export task list as PDF
- Profile page with logout
- Responsive UI using Tailwind CSS

## Tech Stack

- React.js (with Vite)
- Tailwind CSS
- Axios
- React Router

## Setup Instructions

1. Navigate to the `frontend/` folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

``` bash
npm run dev
```

Frontend runs at: http://localhost:5173



