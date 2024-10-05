const mongoose = require('mongoose');

// Define the Weather schema
const WeatherSchema = new mongoose.Schema({
    city: { type: String, required: true },
    temperature: { type: String, required: true },
    description: { type: String, required: true },
});

// Create the Weather model
const Weather = mongoose.model('Weather', WeatherSchema);

module.exports = Weather;
