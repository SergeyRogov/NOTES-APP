import Note from "../models/Note.js";

export async function getAllNotes(_, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getNote(req, res) {
  try {
    const foundNote = await Note.findById(req.params.id);
    if (!foundNote) {
      res.status(404).json({ message: "Note not found" });
    } else {
      res.status(200).json(foundNote);
    }
  } catch (error) {
    console.error("Error in getNote: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNote: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function modifyNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      {
        new: true,
      }
    );

    if (!updatedNote) {
      res.status(404).json({ message: "Note not found" });
    } else {
      res.status(200).json(updatedNote);
    }
  } catch (error) {
    console.error("Error in modifyNote: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      res.status(404).json({ message: "Note not found" });
    } else {
      res.status(200).json(deletedNote);
    }
  } catch (error) {
    console.error("Error in deleteNote: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
