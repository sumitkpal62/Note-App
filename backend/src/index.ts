import express from 'express';
import cors from 'cors';

const PORT = 4000;

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/notes', async (req, res) => {
  res.json({ message: 'Hello World' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})