import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import handler from "./chat.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", (req, res) => handler(req, res));

app.listen(3001, () => {
  console.log("API running at http://localhost:3001/api/chat");
});
