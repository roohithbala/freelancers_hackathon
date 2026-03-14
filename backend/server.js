const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const generateRoutes = require('./routes/generate');
const otpRoutes = require('./routes/otp');
const paymentRoutes = require('./routes/payment');

const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/generate', generateRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/payment', paymentRoutes);

app.get('/health', (req, res) => {
    res.send('AI Project Idea Generator API is running');
});

// Final catch-all for SPA routing (Express 5 safe)
app.use((req, res, next) => {
    // If it's an API request that wasn't handled, return 404
    if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: 'API route not found' });
    }
    // Otherwise serve index.html for the frontend SPA
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
