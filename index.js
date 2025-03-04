const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample user data (you can replace this with a real database in production)
const users = [
  {
    id: 1,
    username: 'testuser',
    password: 'password123' // "password123" hashed
  }
];

// Secret key for JWT
const JWT_SECRET = 'sushma'; // Change this in production

// Login API endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = users.find(u => u.username === username);
  
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }


  // Generate JWT token
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

  // Send token as response
  res.json({ token });
});

// Public route to test the app
app.get('/', (req, res) => {
  res.send('Hello 🤣🤣');
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
