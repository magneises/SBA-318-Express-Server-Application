import express from 'express';

const app = express();
const PORT = 3000;

// Middleware
const logger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};
app.use(logger);
app.use(express.json());

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Workout API!');
});


// GET: Fetch exercises from the external API using fetch
app.get('/api/work', async (req, res) => {
    const muscleGroup = req.query.muscle || 'biceps'; // Default to 'biceps'
    const url = `https://work-out-api1.p.rapidapi.com/search?Muscles=${muscleGroup}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '23f1e4dffamsha0d31028b75d3eep1b7ecajsn64f463fa1707',
            'x-rapidapi-host': 'work-out-api1.p.rapidapi.com',
        },
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json(); // Parse the JSON response
        res.json(data); // Send the response back to the client
    } catch (error) {
        console.error('Error fetching data from Work Out API:', error.message);
        res.status(500).json({ error: 'Failed to fetch workout data' });
    }
});

// Error handling
app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
