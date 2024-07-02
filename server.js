require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection URI from .env file
const mongoURI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Import models
const Alert = require('./models/Alerts');
const Image = require('./models/Imagese');

// Parse application/json
app.use(bodyParser.json({ limit: '50mb' })); // Increase body limit for large images

// Endpoint to receive alerts
app.post('/api/alerts', (req, res) => {
    const alertData = req.body;
    console.log('Received alert:', alertData);

    // Create a new alert document
    const newAlert = new Alert({
        message: alertData.message
    });

    // Save the alert to MongoDB
    newAlert.save()
        .then(savedAlert => {
            console.log('Saved alert:', savedAlert);
            res.sendStatus(200); // Send OK response
        })
        .catch(err => {
            console.error('Error saving alert:', err);
            res.status(500).send('Error saving alert');
        });
});

// Endpoint to receive images
app.post('/api/images', (req, res) => {
    const imageData = req.body;
    console.log('Received image data');

    // Create a new image document
    const newImage = new Image({
        data: Buffer.from(imageData, 'base64'),
        contentType: 'image/jpeg' // Adjust based on image type received
    });

    // Save the image to MongoDB
    newImage.save()
        .then(savedImage => {
            console.log('Saved image:', savedImage);
            res.sendStatus(200); // Send OK response
        })
        .catch(err => {
            console.error('Error saving image:', err);
            res.status(500).send('Error saving image');
        });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
