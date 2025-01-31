require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/userRoutes'); // Correct path

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use('/api/userRoutes', userRoutes);

// listen for requests
const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
