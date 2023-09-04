const express = require('express');
// const routes = require('./routes');
const db = require('./config/connection');
const { User, Thought, Reaction } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(routes);

// Finds all Users
app.get('/users', async (req, res) => {
  try {
    const result = await User.find({});
    res.status(200).json(result);
  } catch (err) {
    console.log('Users were not found');
    res.status(500).json({ error: 'Users were not found' });
  }
});

//Finds all Thoughts
app.get('/thoughts', async (req, res) => {
  try {
    const result = await Thought.find({});
    res.status(200).json(result);
  } catch (err) {
    console.log('Thoughts were not found');
    res.status(500).json({ error: 'Thoughts were not found' });
  }
});

//Adds a new user
app.post('/users', async (req, res) => {
  const newUser = new User(
    {
      username: req.body.username,
      email: req.body.email
    })
  newUser.save();
  if (newUser) {
    res.status(201).json(newUser);
  } else {
    console.log('New User was not created');
    res.status(500).json({ error: 'New User was not created' });
  }
});

//Adds a new thought
app.post('/thoughts', async (req, res) => {
  const newThought = new Thought(
    {
      thoughtText: req.body.thoughtText,
      username: req.body.username
    })
  newThought.save();
  if (newThought) {
    res.status(201).json(newThought);
  } else {
    console.log('New Thought was not created');
    res.status(500).json({ error: 'New Thought was not created' });
  }
});



db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});