import mongoose from 'mongoose';

// defines a NoteSchema using mongoose
const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'archived'],
    default: 'active',
  },
  tags: [String],
});

// create a mongoose model based on NoteSchema to interact with the 'notes' collection in the database.
export const NoteModel = mongoose.model('note', NoteSchema);
