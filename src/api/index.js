import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'; // Load .env variables
import 'dotenv/config';
import { PrismaClient } from '@prisma/client'

const app = express();
app.use(cors({
    credentials: true,
    origin:"http://localhost:5173"
}))
app.use(cookieParser());
app.use(express.json());
// eslint-disable-next-line no-undef
const PORT=process.env.PORT||3000;
const prisma = new PrismaClient()
app.get('/', (req,res)=>{
    res.send('Hello from the server!');
})
app.post("/create-user", async (req, res) => {
    const { email, name } = req.body;
  
    try {
      const user = await prisma.user.create({
        data: {
          email,
          name,
        },
      });
  
      res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating user" });
    }
  });
  
  // 🟢 Route to fetch all users 
  app.get("/users", async (req, res) => {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching users" });
    }
  });
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});