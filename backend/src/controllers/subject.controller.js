import Subject from "../models/subject.model.js"

export const createSubject = async (req, res) => {
    const {name} = req.body

    try {
        const newSubject = new Subject({name})
        newSubject.save()
        if (newSubject) {
            res.status(201).json(newSubject)
        } else {
            res.status(400).json({message: "Invalid Data"})
        }
    } catch (e) {
        console.log("Error creating subject", e.message)
        res.status(500).json({message: "Intenal server error"})
    }
}

export const fetchAllSubject = async (req, res) => {
    try {
        const subjects = await Subject.find().sort({ name: 1 });
        res.status(200).json(subjects)
    } catch (e) {
        console.log("Error fetching subject", e.message)
        res.status(500).json({message: "Intenal server error"})
    }
}

export const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id", id);
    
    await Subject.findByIdAndDelete(id);
    res.json({ message: "Subject deleted successfully" });
  } catch (e) {
    console.log("Error deleting subject", e.message)
    res.status(500).json({ error: "Failed to delete subject" });
  }
};