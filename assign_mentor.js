import express from 'express';
import { getAllStudents, getAllMentors, addMentor, addStudent, assignMentor, getStudentByMentorId, getUnassignedStudents } from "./utils.js";

const router = express.Router();

router.get("/mentors", async (req, res) => {
    const response = await getAllMentors();
    res.send(response)
})

router.get("/students", async (req, res) => {
    const response = await getAllStudents();
    res.send(response)
})

router.post("/add-mentor", async (req, res) => {
    const data = req.body;
    const response = await addMentor(data)
    res.send(response)
})

router.post("/add-student", async (req, res) => {
    const data = req.body;
    const response = await addStudent(data)
    res.send(response)
})

router.put("/assign-mentor", async (req, res) => {
    let { studentName, mentorName } = req.body;
    try {
        const response = await assignMentor(studentName, mentorName)
        res.send(response)
    }
    catch (err) { console.log(err) }
})
router.get("/unassigned-students", async (req, res) => {
    const response = await getUnassignedStudents()
    res.send(response)
})
router.get("/students/:mentorId", async (req, res) => {
    const { mentorId } = req.params;

    try {
        const response = await getStudentByMentorId(mentorId)
        res.send(response)
    }
    catch (err) { console.log(err) }
})

export const assignMentorRoute = router;