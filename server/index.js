const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

require('dotenv').config();

const port = process.env.PORT || 8080;
const URI = process.env.DB_CONNECTION_STRING;
const dbName = process.env.DB_NAME;

const app = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient(URI);

app.post('/login', async (req, res) => {
  try {
    const { name, password } = req.body;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('Login')
      .insertOne({ name, password, ownerId: new ObjectId(req.body.ownerId) });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/registered', async (req, res) => {
  try {
    const { name, password } = req.body;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('Registered')
      .insertOne({ name, password, ownerId: new ObjectId(req.body.ownerId) });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/questions', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db(dbName).collection('Questions').find().toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/answers', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db(dbName).collection('Answers').find().toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/answers/:id', (req, res) => {
  const index = answers.findIndex(
    (item) => item.id === parseInt(req.params.id),
  );
  if (index === -1) {
    res.status(404).send('Answer not found');
  } else {
    answers.splice(index, 1);
    res.send('Answer removed');
  }
});

app.delete('/questions/:id', (req, res) => {
  const index = questions.findIndex(
    (item) => item.id === parseInt(req.params.id),
  );
  if (index === -1) {
    res.status(404).send('Question not found');
  } else {
    questions.splice(index, 1);
    res.send('Question removed');
  }
});

app.listen(port, () => {
  console.log(`Server is running on the ${port} port`);
});
