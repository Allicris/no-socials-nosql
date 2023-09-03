const express = require('express');

const db = require('./config/connection');

const { Users, Thoughts } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Finds all Users
app.get('/users', async (req, res) => {
  try {
    const result = await Users.find({});
    res.status(200).json(result);
  } catch (err) {
    console.log('Users were not found');
    res.status(500).json({ error: 'Users were not found'});
  }
});

//Finds all Thoughts
app.get('/thoughts', async (req, res) => {
  try {
    const result = await Thoughts.find({});
    res.status(200).json(result);
  } catch (err) {
    console.log('Thoughts were not found');
    res.status(500).json({ error: 'Thoughts were not found'});
  }
});


