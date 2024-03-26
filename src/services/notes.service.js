import { NoteModel } from '../models/Note';

// Create a new note in the database
export const createOneNote = async (data) => {
  const newNote = new NoteModel(data);
  // Save the new note to the database and return it
  return await newNote.save();
};

// Get all notes based on a query object
export const getAllNotes = async (query) => {
  // Find notes matching the query
  const notes = await NoteModel.find(query);
  return notes;
};

// filter notes by status or tags, with optional search by title
export const getFilterNotes = async (query) => {
  let filter = {};
  if (query.status) {
    // Filter by status
    filter.$or = [{ status: query.status }];
  }

  console.log('filter ', filter);
  if (query.tags) {
    // Filter by tags, assuming a comma-separated list
    filter.$or = filter.$or || [];
    filter.$or.push({
      tags: {
        $in: query.tags.split(',').map((tag) => new RegExp(tag.trim(), 'i')),
      },
    });
  }

  if (query.search) {
    // Filter by title
    filter.$or = filter.$or || [];
    filter.$or.push({ title: { $regex: new RegExp(query.search, 'i') } });
  }
  console.log('filter all ', filter);
  // Find notes matching the combined filters
  const notes = await NoteModel.find(filter);

  return notes;
};

// Get notes pagination, allowing to skip a certain number of documents and limit the result set
export const getPaginatedNotes = async (query, page = 1, limit = 10) => {
  // extract filters from the query, excluding page and limit
  const queryFilters = getFilterQuery(query);
  //console.log('filter ', queryFilters);
  const skip = (page - 1) * limit; // Calculate skip based on page and limit
  const options = { skip, limit };
  const notes = await NoteModel.find(queryFilters, null, options);
  // Get the total count of documents matching the filters
  const total = await NoteModel.countDocuments(queryFilters);

  return {
    notes,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
};

const getFilterQuery = (query) => {
  // Exclude page and limit from the query parameters to form filters
  const { page, limit, ...filterParams } = query;
  return filterParams;
};

// Update a note by ID
export const updateNoteById = async (id, data) => {
  const updatedNote = await NoteModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return updatedNote;
};

// Delete a note by ID
export const deleteNoteById = async (id) => {
  return await NoteModel.findByIdAndDelete(id);
};
