const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Weather = require('./models/Weather'); // Import the Weather model

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
        // Start the server only after successful DB connection
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error('MongoDB connection error:', err));

// Sample weather data (you can manually insert this into your MongoDB)
const sampleWeatherData = [
    { city: 'Milwaukee', temperature: '15°C', description: 'Partly cloudy' },
    { city: 'New York', temperature: '20°C', description: 'Sunny' },
    { city: 'Los Angeles', temperature: '25°C', description: 'Clear sky' },
];

// API endpoint to get weather data
app.get('/api/weather', async (req, res) => {
    try {
        // Insert sample data if collection is empty
        const count = await Weather.countDocuments();
        if (count === 0) {
            await Weather.insertMany(sampleWeatherData);
            console.log('Sample weather data inserted');
        }

        const weather = await Weather.find();
        res.json(weather);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

