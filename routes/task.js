const express = require('express');
const Task = require('../models/task');
const router = express.Router();

// Create a new task
router.post('/tasks', async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all tasks
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving tasks' });
    }
});

router.delete('/tasks/:id', async (req, res) => {
    
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({error: 'Task not found'});
        }
        res.status(204).json({message: 'Deletion successful'});
    } catch (error) {
        res.status(500).json({error: 'Error deleting task.'});
    }
});

module.exports = router;