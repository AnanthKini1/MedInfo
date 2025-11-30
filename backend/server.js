const express = require('express');
const cors = require('cors');

const drugRoutes = require('./routes/drugs');

const app = express();

const PORT = 5001;

app.use(cors());            
app.use(express.json());    

app.get('/', (req, res) => {
    res.json({ message: 'MedInfo API is running!' });
});

app.use('/api/drugs', drugRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
