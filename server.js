const express = require('express');
const connectDataBase = require('./config/database');
const colors = require('colors');
const app = express();
connectDataBase();

// Initialize Middleware
app.use(express.json({ extented: false }));
app.get('/', (req, res) =>
  res.json({
    connection: true,
    status: 'Backend API Running'
  })
);

// Define Routes
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/posts', require('./routes/posts'));
app.use('/api/v1/profile', require('./routes/profile'));
app.use('/api/v1/auth', require('./routes/auth'));
const PORT = process.env.PORT || 5010;

app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`.yellow.bold)
);

// Handle all promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);
  // close server and exit process
  server.close(() => {
    process.exit(1);
  });
});
