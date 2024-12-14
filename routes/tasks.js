const express = require('express');
const router = express.Router();
const getConnection = require('../db');

// Add a new task
router.post('/add', async (req, res) => {
    const { title, description } = req.body;
    try {
        const connection = await getConnection();
        const result = await connection.execute(
            `INSERT INTO tasks (title, description) VALUES (:title, :description)`,
            { title, description },
            { autoCommit: true }
        );
        res.json({ message: 'Task added successfully', taskId: result.lastRowid });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.execute(`SELECT * FROM tasks ORDER BY created_at DESC`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a task
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    try {
        const connection = await getConnection();
        await connection.execute(
            `UPDATE tasks SET title = :title, description = :description, status = :status WHERE id = :id`,
            { title, description, status, id },
            { autoCommit: true }
        );
        res.json({ message: 'Task updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a task
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await getConnection();
        await connection.execute(
            `DELETE FROM tasks WHERE id = :id`,
            { id },
            { autoCommit: true }
        );
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
