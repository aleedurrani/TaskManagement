const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/User');
const Task = require('./models/Task');

const app = express();
app.use(bodyParser.json());

const JWT_SECRET = 'your-secret-key';


mongoose.connect('mongodb+srv://i211129:task123@cluster0.mumlqvv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB:', error));


const authenticateUser = (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ error: 'Token not provided' });
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid token' });
      }
      req.user = decoded.userId;
      next();
    });
};

app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post('/create/task', authenticateUser, async (req, res) => {
  try {
    const { title, description, dueDate, category, priority } = req.body;
    const user = req.user;
    const task = await Task.create({ title, description, dueDate, category, priority, user });
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/my/tasks', authenticateUser, async (req, res) => {
    try {
      const user = req.user;
      const { sortBy } = req.query;
      let sortCriteria = {};
  
      if (sortBy === 'dueDate') {
        sortCriteria = { dueDate: 1 }; 
      } else if (sortBy === 'category') {
        sortCriteria = { category: 1 }; 
      } else if (sortBy === 'completionStatus') {
        sortCriteria = { completed: 1 }; 
      } else {
        return res.status(400).json({ error: 'Invalid sort criteria' });
      }
  
      const tasks = await Task.find({ user }).sort(sortCriteria);
      res.json({ tasks });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

app.put('/tasks/:id/complete', authenticateUser, async (req, res) => {
    try {
      const taskId = req.params.id;
      const user = req.user;
  
      const task = await Task.findOne({ _id: taskId, user });
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      task.completed = true;
      await task.save();
  
      res.json({ message: 'Task marked as completed', task });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });



app.listen(3000, () => console.log("Server is running on port 3000"));

