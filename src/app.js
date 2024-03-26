import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { router as notesRouter } from './routers/notes.router';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/notes', notesRouter); // Mount router at `/api/notes` prefix
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((error) => console.log(error.message));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
