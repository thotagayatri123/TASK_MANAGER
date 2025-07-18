const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Database connect cheyyadam
mongoose.connect('mongodb://localhost:27017/cruddb', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch(err => console.log("❌ MongoDB Connection Failed:", err));
// Schema create cheyyadam
const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String
});

// Model create cheyyadam
const Task = mongoose.model('Task', TaskSchema);

// Create Task API
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.send(task);
});

// Get All Tasks API
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.send(tasks);
});

// Update Task API
app.put('/tasks/:id', async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(task);
});

// Delete Task API
app.delete('/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.send({ message: 'Task deleted' });
});

// Server start cheyyadam
app.listen(3000, () => console.log('Server running on port 3000'));

