const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const generateRoutes = require('./routes/generate');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/generate', generateRoutes);

app.get('/', (req, res) => {
    res.send('AI Project Idea Generator API is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
