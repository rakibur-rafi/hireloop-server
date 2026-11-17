import express from "express";
import cors from "cors";
import 'dotenv/config';
import { MongoClient } from 'mongodb';


const app = express();
const PORT= process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);
export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

const connection = await connectToMongoDB();
const db = connection.db("hireloopdb");
const users = db.collection("user");
const jobs = db.collection("jobs");

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users", async (req, res) => {
    const cursor = await users.find({})
    const result = await cursor.toArray();
    res.send(result);
});

app.post("/jobs", async (req, res) => {
    const job = req.body;
    const result = await jobs.insertOne(job);
    res.send(result);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
