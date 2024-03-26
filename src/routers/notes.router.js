import { Router } from 'express';
import {
  createNote,
  deleteNote,
  getNotes,
  getNoteSearch,
  updateNote,
  getNotesPagination,
} from '../controllers/nodes.controller';

export const router = Router();

// Define routes for CRUD operations
router.post('/', createNote);
router.get('/', getNotes);
router.get('/search', getNoteSearch);
router.get('/pagination', getNotesPagination);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);
