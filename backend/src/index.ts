import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const PORT = 4000;

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get('/api/notes', async (req, res) => {
  const notes = await prisma.note.findMany();
  res.json(notes);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})