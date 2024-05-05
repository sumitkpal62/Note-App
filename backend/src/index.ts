import express, { Request, Response } from 'express';
import cors from 'cors';
import { Note, PrismaClient } from '@prisma/client';

const PORT: number = 4000;

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

// Interface for request body of POST and PUT endpoints
interface NoteRequestBody {
  title: string;
  content: string;
}

// Interface for request params of PUT and DELETE endpoints
interface NoteRequestParams {
  id: number;
}

// Endpoints for getting all the notes from db.

app.get('/api/notes', async (req: Request, res:Response) => {

  try {
    const notes: Note[] = await prisma.note.findMany({
      orderBy: {
        id: 'desc'
      }
    });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoints for inserting note into the db.

app.post('/api/notes', async (req: Request<{}, {}, NoteRequestBody>, res: Response) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400).json({"message": "title and content fields are required"})
  }

  try {
    const note: Note = await prisma.note.create({
      data: { title, content }
    });
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
})

// Endpoints for updating note into the db

app.put('/api/notes/:id', async (req: Request<NoteRequestParams, {}, NoteRequestBody>, res:Response) => {
  const { title, content } = req.body;
  const id = Number(req.params.id)

  if (!id || isNaN(id)) {
    res.status(400).json({
      "message": "Invalid request!"
    })
  }

  if (!title || !content) {
    res.status(400).send({
      "message": "title and content fields are required"
    })
  }

  try {
    const updatedNote:Note = await prisma.note.update({
      where: { id: Number(id) },
      data: { title, content }
    })
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
})

// Endpoints for deleting note into the db.

app.delete('/api/notes/:id', async (req:Request<NoteRequestParams>, res:Response) => {
  const id = Number(req.params.id)

  if (!id || isNaN(id)) {
    res.status(400).json({
      "message": "Invaild request, Id should be number"
    })
  }

  try {
    await prisma.note.delete({
      where: { id: Number(id) },
    })
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})