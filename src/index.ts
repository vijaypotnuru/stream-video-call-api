import express from "express";
import dotenv from "dotenv";
import { genSaltSync, hashSync } from "bcrypt";

dotenv.config();

const { PORT, STREAM_API_KEY, STREAM_API_SECRET } = process.env;

const app = express();
app.use(express.json());
const salt = genSaltSync(10);

interface User {
  id: string;
  email: string;
  hashed_password: string;
}

const USERS: User[] = [];

app.get("/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long." });
  }

  const existingUser = USERS.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists." });
  }

  try {
    const hashed_password = hashSync(password, salt);
    const id = Math.random().toString(36).slice(2);
    console.log(id);
  } catch (err) {
    res.status(500).json({ error: "User already exists." });
  }
});

app.post("/login", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
