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

app.gnpet('/', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db(dbName).collection('Questions').find().toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/', async (req, res) => {
  try {
    const { type, name } = req.body;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('Questions')
      .insertOne({ type, name, ownerId: new ObjectId(req.body.ownerId) });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on the ${port} port`);
});
