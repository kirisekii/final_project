const express = require("express");
const router = require("express").Router();
const session = require("express-session");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();

const app = express();
const corsOptions = {
  origin: "http://localhost:3002", // Replace with the origin of your React app
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true if using HTTPS
      maxAge: 1000 * 60 * 60 * 24, // Session expiration time (e.g., 1 day)
    },
  })
);

const port = process.env.PORT || 5000;
const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    await client.connect();
    const db = client.db("test");
    const collection = db.collection("users");
    const user = await collection.insertOne({
      username: username,
      password: password,
    });

    res.json({ message: "Created" });
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    await client.connect();
    const db = client.db("test");
    const collection = db.collection("users");
    const user = await collection.findOne({
      username: username,
      password: password,
    });

    if (user) {
      console.log("User logged in successfully!");
      req.session.userId = JSON.stringify(user._id);
      console.log(req.session.userId);
      res.json({ userId: req.session.userId });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

app.get("/questions", async (req, res) => {
  const sortOption = req.query.sortBy;
  const sortOder = req.query.sortOrder;
  const filterOption = req.query.filter;
  const userId = req.session.userId;

  if (!!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    await client.connect();
    const db = client.db("test");
    const collection = db.collection("questions");

    const queryOptions = [
      {
        $lookup: {
          from: "answers",
          localField: "_id",
          foreignField: "questionId",
          as: "answers",
        },
      },
      {
        $addFields: {
          answerCount: { $size: "$answers" },
        },
      },
    ];

    if (filterOption === "answered") {
      queryOptions.push({ $match: { answerCount: { $gt: 0 } } });
    } else if (filterOption === "unanswered") {
      queryOptions.push({ $match: { answerCount: { $eq: 0 } } });
    }

    if (sortOption === "answerCount") {
      queryOptions.push({
        $sort: { answerCount: sortOrder === "asc" ? 1 : -1 },
      });
    } else if (sortOption === "createdAt") {
      queryOptions.push({ $sort: { createdAt: sortOrder === "asc" ? 1 : -1 } });
    }

    const questions = await collection.aggregate(queryOptions).toArray();

    res.json(questions);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

app.post("/questions", async (req, res) => {
  const { title, content } = req.body;
  const userId = req.session.userId;

  console.log("questions");
  console.log(userId);
  console.log(req.body);

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const newQuestion = {
    title,
    content,
    answers: 0,
    userId: userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  console.log(newQuestion);

  try {
    await client.connect();
    const db = client.db("test");
    const collection = db.collection("questions");
    const question = await collection.insertOne(newQuestion);
    res.json(question);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

app.patch("/questions/:id", async (req, res) => {
  const { title, content } = req.body;
  const questionId = req.params.id;
  const userId = req.session.userId;

  if (!!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    await client.connect();
    const db = client.db("test");
    const collection = db.collection("questions");
    const filter = { _id: ObjectId(questionId), userId: ObjectId(userId) };

    const update = {
      $set: {
        title,
        content,
        updatedAt: new Date(),
      },
    };

    const result = await collection.updateOne(filter, update);

    if (result.modifiedCount === 0) {
      res.status(404).json({ message: "Error" });
    } else {
      res.json({ message: "Updated" });
    }
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

app.delete("/questions/:id", async (req, res) => {
  const questionId = req.params.id;
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    await client.connect();
    const db = client.db("test");
    const collection = db.collection("questions");
    const filter = { _id: ObjectId(questionId), userId: ObjectId(userId) };
    const result = await collection.deleteOne(filter);

    if (result.deletedCount === 0) {
      res.status(404).json({ message: "Error" });
    } else {
      res.json({ message: "Deleted" });
    }
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

app.get("/questions/:id/answers", async (req, res) => {
  const questionId = req.params.id;
  const userId = req.session.userId;

  console.log("answers");
  console.log(userId);
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    await client.connect();
    const db = client.db("test");
    const collection = db.collection("answers");
    const answers = await collection.find({ questionId: questionId }).toArray();
    res.json(answers);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

app.post("/questions/:id/answers", async (req, res) => {
  const questionId = req.params.id;
  const userId = req.session.userId;
  const { content } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const newAnswer = {
    content,
    questionId: questionId,
    createdAt: new Date(),
    updatedAt: new Date(),
    likedUsersIds: [],
    dislikedUsersIds: [],
  };

  try {
    await client.connect();
    const db = client.db("test");
    const collection = db.collection("answers");
    const answer = await collection.insertOne(newAnswer);
    res.json(answer);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

app.post("/answers/:id/like", async (req, res) => {
  const answerId = req.params.id;
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    await client.connect();
    const db = client.db("test");
    const collection = db.collection("answers");
    const answer = await collection.findOne({ _id: new ObjectId(answerId) });
    console.log(answer);
    const likedUsersIds = answer.likedUsersIds.concat(userId);
    const dislikedUsersIds = answer.dislikedUsersIds.filter(
      (id) => id !== userId
    );

    const filter = { _id: new ObjectId(answerId) };
    const update = {
      $set: {
        likedUsersIds: likedUsersIds,
        dislikedUsersIds: dislikedUsersIds,
        updatedAt: new Date(),
      },
    };
    const result = await collection.updateOne(filter, update);

    res.json(result);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

app.post("/answers/:id/dislike", async (req, res) => {
  const answerId = req.params.id;
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    await client.connect();
    const db = client.db("test");
    const collection = db.collection("answers");
    const answer = await collection.findOne({ _id: new ObjectId(answerId) });
    console.log(answer);
    const dislikedUsersIds = answer.dislikedUsersIds.concat(userId);
    const likedUsersIds = answer.likedUsersIds.filter((id) => id !== userId);

    const filter = { _id: new ObjectId(answerId) };
    const update = {
      $set: {
        likedUsersIds: likedUsersIds,
        dislikedUsersIds: dislikedUsersIds,
        updatedAt: new Date(),
      },
    };
    const result = await collection.updateOne(filter, update);

    res.json(result);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

app.patch("/answers/:id", async (req, res) => {
  const answerId = req.params.id;
  const userId = req.session.userId;
  const { content, likedUsersIds, dislikedUsersIds } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    await client.connect();
    const db = client.db("test");
    const collection = db.collection("answers");

    const filter = { _id: ObjectId(answerId) };
    const update = {
      $set: { content, likedUsersIds, dislikedUsersIds, updatedAt: new Date() },
    };
    const result = await collection.updateOne(filter, update);

    if (result.modifiedCount === 0) {
      res.status(404).json({ message: "Error" });
    } else {
      res.json({ message: "Updated" });
    }
    res.json(answer);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

app.delete("/answers/:id", async (req, res) => {
  const answerId = req.params.id;
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    await client.connect();
    const db = client.db("test");
    const collection = db.collection("answers");
    const filter = { _id: new ObjectId(answerId) };
    const result = await collection.deleteOne(filter);

    if (result.deletedCount === 0) {
      res.status(404).json({ message: "Error" });
    } else {
      res.json({ message: "Deleted" });
    }
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
