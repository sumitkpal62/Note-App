import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { title } from 'process';

const PORT = 4000;

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

// Endpoints for getting all the notes from db.

app.get('/api/notes', async (req, res) => {
  const notes = await prisma.note.findMany();
  res.json(notes);
});

// Endpoints for inserting note into the db.

app.post('/api/notes', async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400).json({"message": "title and content fields are required"})
  }

  try {
    const note = await prisma.note.create({
      data: {title, content}
    })
    res.json(note);
  } catch (error) {
    res.status(500).json({
      'message': 'Something went wrong'
    })
  }
})

// Endpoints for updating note into the db

app.put('/api/notes/:id', async (req, res) => {
  const { title, content } = req.body;
  const id = Number(req.params.id)

  if (!id || isNaN(id)) {
    res.status(400).json({
      "message": "Invalid request, Id should be number"
    })
  }

  if (!title || !content) {
    res.status(400).send({
      "message": "title and content fields are required"
    })
  }

  try {
    const updatedNote = await prisma.note.update({
      where: { id },
      data: { title, content }
    })
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({
      'message': 'Something went wrong'
    })
  }
})

// Endpoints for deleting note into the db.

app.delete('/api/notes/:id', async (req, res) => {
  const id = Number(req.params.id)

  if (!id || isNaN(id)) {
    res.status(400).json({
      "message": "Invaild request, Id should be number"
    })
  }

  try {
    const resultedNote = await prisma.note.delete({
      where: { id },
    })
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      "message": "Something went wrong"
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})