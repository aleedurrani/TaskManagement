const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title:
  { type: String, 
    required: true 
  },
  description: String,
  dueDate: 
  { type: Date, 
    required: true 
  },
  category: 
  { type: String, 
    enum: ['Work', 'Personal', 'Errands'], 
    required: true 
  },
  priority: 
  { type: String, 
    enum: ['High', 'Medium', 'Low'], 
    default: 'Medium' 
  },
  completed: 
  { type: Boolean, 
    default: false 
  },
  userID: 
  { type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
});

module.exports = mongoose.model('Task', taskSchema);
