import express from 'express';
import cors from 'cors';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = join(__dirname, 'data.json');

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // Allow your frontend URL in production
  credentials: true
}));
app.use(express.json());

// Initialize data file if it doesn't exist
if (!existsSync(DATA_FILE)) {
  writeFileSync(DATA_FILE, JSON.stringify({ todos: [], notes: [] }, null, 2));
}

// Helper function to read data
const readData = () => {
  try {
    const data = readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { todos: [], notes: [] };
  }
};

// Helper function to write data
const writeData = (data) => {
  writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// ========== TODO ROUTES ==========

// Get all todos
app.get('/api/todos', (req, res) => {
  const data = readData();
  res.json(data.todos);
});

// Get single todo
app.get('/api/todos/:id', (req, res) => {
  const data = readData();
  const todo = data.todos.find(t => t.id === req.params.id);
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  res.json(todo);
});

// Create todo
app.post('/api/todos', (req, res) => {
  const data = readData();
  const { title, description, priority = 'medium', completed = false } = req.body;
  
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTodo = {
    id: uuidv4(),
    title: title.trim(),
    description: description?.trim() || '',
    priority,
    completed,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  data.todos.push(newTodo);
  writeData(data);
  res.status(201).json(newTodo);
});

// Update todo
app.put('/api/todos/:id', (req, res) => {
  const data = readData();
  const index = data.todos.findIndex(t => t.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  const { title, description, priority, completed } = req.body;
  const todo = data.todos[index];

  if (title !== undefined) todo.title = title.trim();
  if (description !== undefined) todo.description = description?.trim() || '';
  if (priority !== undefined) todo.priority = priority;
  if (completed !== undefined) todo.completed = completed;
  todo.updatedAt = new Date().toISOString();

  writeData(data);
  res.json(todo);
});

// Delete todo
app.delete('/api/todos/:id', (req, res) => {
  const data = readData();
  const index = data.todos.findIndex(t => t.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  data.todos.splice(index, 1);
  writeData(data);
  res.json({ message: 'Todo deleted successfully' });
});

// ========== NOTES ROUTES ==========

// Get all notes
app.get('/api/notes', (req, res) => {
  const data = readData();
  res.json(data.notes);
});

// Get single note
app.get('/api/notes/:id', (req, res) => {
  const data = readData();
  const note = data.notes.find(n => n.id === req.params.id);
  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }
  res.json(note);
});

// Create note
app.post('/api/notes', (req, res) => {
  const data = readData();
  const { title, content, color = 'yellow' } = req.body;
  
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newNote = {
    id: uuidv4(),
    title: title.trim(),
    content: content?.trim() || '',
    color,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  data.notes.push(newNote);
  writeData(data);
  res.status(201).json(newNote);
});

// Update note
app.put('/api/notes/:id', (req, res) => {
  const data = readData();
  const index = data.notes.findIndex(n => n.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Note not found' });
  }

  const { title, content, color } = req.body;
  const note = data.notes[index];

  if (title !== undefined) note.title = title.trim();
  if (content !== undefined) note.content = content?.trim() || '';
  if (color !== undefined) note.color = color;
  note.updatedAt = new Date().toISOString();

  writeData(data);
  res.json(note);
});

// Delete note
app.delete('/api/notes/:id', (req, res) => {
  const data = readData();
  const index = data.notes.findIndex(n => n.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Note not found' });
  }

  data.notes.splice(index, 1);
  writeData(data);
  res.json({ message: 'Note deleted successfully' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});




