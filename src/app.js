require('dotenv').config();
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Routes
const calculateRoute = require('./routes/calculateRoute');
const authRoute = require('./routes/authRoute'); // If implementing auth

app.use('/api', calculateRoute);
app.use('/auth', authRoute); // If implementing auth

// Error Handling Middleware (Optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the Server only if not in test environment
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
