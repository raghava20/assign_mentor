import { client } from "./index.js";
import { ObjectId } from 'mongodb';


export const getAllMentors = async () => {
    const result = await client.db("assignmentor").collection("mentors").find({}).toArray()
    return result
}

export const getAllStudents = async () => {
    const result = await client.db("assignmentor").collection("students").find({}).toArray()
    return result
}

export const addMentor = async (data) => {
    const result = await client.db("assignmentor").collection("mentors").insertOne(data)
    return result
}

export const addStudent = async (data) => {
    const result = await client.db("assignmentor").collection("students").insertOne(data)
    return result
}

export const assignMentor = async (studentName, mentorName) => {
    const studentData = await client.db("assignmentor").collection("students").find({ studentName: { $in: studentName } }).toArray()
    const mentorData = await client.db("assignmentor").collection("mentors").findOne({ mentorName: mentorName })
    const data = studentData.map(std => {
        console.log(std)
        return ObjectId(std._id)
    })
    await removeMentorIfAssigned(studentData)
    const addStudentsToMentor = await client.db("assignmentor").collection("mentors").updateOne({ _id: mentorData._id }, { $addToSet: { studentsId: { $each: data } } })

    const addStudentToMentor = await client.db("assignmentor").collection("students").updateMany({ _id: { $in: data } }, { $set: { mentorId: mentorData._id } })

    return { addStudentsToMentor, addStudentToMentor }

}

const removeMentorIfAssigned = async (data) => {
    const studentData = data;
    studentData.forEach(async (student) => {
        if (mentorId) {
            const dbData = await client.db("assignmentor").collection("mentor").updateOne({ _id: student.mentorId }, { $pull: { studentsId: student._id } })
        }
    })
}

export const getStudentByMentorId = async (id) => {
    const studentData = await client.db("assignmentor").collection("mentors").findOne({ _id: ObjectId(id) })
    console.log(studentData)
    const data = await client.db("assignmentor").collection("students").find({ _id: { $in: (studentData.studentsId) } }).toArray()
    console.log(data)
    return data
}

export const getUnassignedStudents = async () => {
    const data = await client.db("assignmentor").collection("students").find({ mentorId: { $eq: null } }).toArray()
    return data
}