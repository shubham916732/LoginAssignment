const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://shubham9167:shubham9167@myfirstdb.4gjb2sh.mongodb.net/Login?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// User Schema
const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);

// Registration Route
app.post('/register', async (req, res) => {
  const { firstName, lastName, phoneNumber, email, password } = req.body;
  const newUser = new User({ firstName, lastName, phoneNumber, email, password });

  try {
    await newUser.save();
    res.status(201).send('User registered');
  } catch (error) {
    res.status(400).send('Error registering user');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Fetch user details
app.get('/user', async (req, res) => {
    const userId = req.query.userId;
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).send('User not found');
      res.status(200).json(user);
    } catch (error) {
      res.status(400).send('Error fetching user');
    }
  });
  
  // Update user details
app.put('/user', async (req, res) => {
  const { firstName, lastName, phoneNumber, email, password } = req.body;
  const userId = req.query.userId;

  try {
    const user = await User.findByIdAndUpdate(userId, { firstName, lastName, phoneNumber, email, password }, { new: true });
    if (!user) return res.status(404).send('User not found');
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send('Error updating user');
  }
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user || user.password !== password) {
        return res.status(401).send('Invalid email or password');
      }
      res.status(200).json({ id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email });
    } catch (error) {
      res.status(500).send('Error logging in');
    }
  });
  
  
  