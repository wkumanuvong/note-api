import {
  createOneNote,
  deleteNoteById,
  getAllNotes,
  getFilterNotes,
  updateNoteById,
  getPaginatedNotes,
} from '../services/notes.service';

// Create a note
export const createNote = async (req, res) => {
  try {
    // Calls the service function to create a note with request body data
    const newNote = await createOneNote(req.body);
    // Responds with the newly created note
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve all notes possibly filtered by query parameters
export const getNotes = async (req, res) => {
  try {
    const notes = await getAllNotes(req.query);
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search and filter notes by status or tag through query parameters
export const getNoteSearch = async (req, res) => {
  try {
    console.log('req.query ', req.query);
    const notes = await getFilterNotes(req.query);
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get notes with pagination, using page and limit query parameters
export const getNotesPagination = async (req, res) => {
  try {
    // Parses page and limit from query parameters, providing defaults if none are specified
    const page = parseInt(req.query.page || 1, 10);
    const limit = parseInt(req.query.limit || 10, 10);

    // Fetches paginated notes based on page and limit
    const result = await getPaginatedNotes(req.query, page, limit);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a note by id
export const updateNote = async (req, res) => {
  try {
    const updatedNote = await updateNoteById(req.params.id, req.body);
    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(updatedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a note by id
export const deleteNote = async (req, res) => {
  try {
    const note = await deleteNoteById(req.params.id);
    if (note) {
      res.json({ message: 'Note deleted successfully' });
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
