const express = require('express');
const cors = require('cors');

const drugRoutes = require('./routes/drugs');

const app = express();

const PORT = 5001;

// enables cross-origin requests from frontend
app.use(cors());

// parses incoming JSON request bodies
app.use(express.json());

// health check endpoint
app.get('/', (req, res) => {
    res.json({ message: 'MedInfo API is running!' });
});

// mounts drug routes at /api/drugs
app.use('/api/drugs', drugRoutes);

// starts server on port 5001
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});