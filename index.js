import express from 'express';
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { assignMentorRoute } from "./assign_mentor.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());


const MONGO_URL = process.env.MONGO_URL

const createConnection = async () => {
    const client = new MongoClient(MONGO_URL)
    await client.connect();
    console.log("Mongodb is connected!")
    return client;
}
export const client = await createConnection();

app.use("/", assignMentorRoute)

app.get("/", (req, res) => {
    res.send("You are listening to assign mentor api!")
})

app.listen(PORT, () => {
    console.log("App is running on " + PORT);
})
