import NoteModel from "../models/note.models.js";

export const createNote = async (req,res) => {
    const {title} = req.body;

    try {
        if(!title) {
            return res.status(400).json({message: "Please enter the title"})
        }

        const note = await NoteModel.create({title});

        res.status(201).json({ message: "Note created successfully", note })
    } catch (error) {
        console.error("ERROR in creating notes!!", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getAllNotes = async (_,res) => {
    try {
        const notes = await NoteModel.find().sort({ createdAt: -1 });
        res.status(200).json({ message: "Notes fetched successfully!", notes });
    } catch (error) {
        console.error("ERROR in notes controller!!", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteNote = async(req,res) => {
    const {id} = req.params;

    try {
        const delNote = await NoteModel.findByIdAndDelete(id);
        if (!delNote) return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note deleted successfully", delNote });
    } catch (error) {
        console.error("ERROR in deleting notes!!", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}