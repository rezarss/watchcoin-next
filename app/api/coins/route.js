// pages/api/coins.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async (req, res) => {
  if (req.method === "POST") {
    const { userId, coins, nextSpin } = req.body;
    try {
      await client.connect();
      const database = client.db("clickerGame");
      const users = database.collection("users");
      await users.updateOne(
        { userId },
        { $set: { coins, nextSpin } },
        { upsert: true },
      );
      res.status(200).json({ message: "Data updated" });
    } finally {
      await client.close();
    }
  } else if (req.method === "GET") {
    const { userId } = req.query;
    try {
      await client.connect();
      const database = client.db("clickerGame");
      const users = database.collection("users");
      const user = await users.findOne({ userId });
      res.status(200).json(user);
    } finally {
      await client.close();
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
