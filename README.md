# Todo & Notes App

A beautiful, full-stack todo list and notes application with a modern UI, built with React and Express.js.

## Features

### Todos
-  Create, read, update, and delete todos
-  Priority levels (High, Medium, Low)
-  Mark todos as complete/incomplete
-  Filter todos (All, Active, Completed)
-  Add descriptions to todos
-  Beautiful, responsive UI with animations

### Notes
-  Create, read, update, and delete notes
-  Color-coded notes (6 color options)
-  Rich text content
-  Grid layout for easy browsing
-  Modern card-based design

## Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **JSON File Storage** - Simple data persistence

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the backend server** (from the `backend` directory)
   ```bash
   npm start
   ```
   The backend will run on `http://localhost:3001`

2. **Start the frontend development server** (from the `frontend` directory, in a new terminal)
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:3000`

3. **Open your browser** and navigate to `http://localhost:3000`

## API Endpoints

### Todos
- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get a single todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

### Notes
- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get a single note
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

### Health Check
- `GET /api/health` - Check API status

## Data Storage

The app uses a JSON file (`backend/data.json`) for data persistence. The file is automatically created when the server starts. For production use, consider migrating to a proper database (MongoDB, PostgreSQL, etc.).

## Development

- Backend uses ES modules (`type: "module"`)
- Frontend uses Vite for fast HMR (Hot Module Replacement)
- Tailwind CSS for utility-first styling
- Responsive design that works on mobile and desktop

## Future Enhancements

- User authentication
- Database integration (MongoDB/PostgreSQL)
- Search functionality
- Tags and categories
- Due dates and reminders
- Dark mode
- Export/import functionality

## License

MIT






