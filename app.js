const express = require('express');
const bodyParser = require('body-parser');
const tasksRoutes = require('./routes/tasks');

const app = express();
app.use(bodyParser.json());

app.use('/tasks', tasksRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Task Management System running on http://localhost:${PORT}`);
});
