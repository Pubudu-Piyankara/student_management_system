import db from "../Database.js";

const getAllTeachers = (req, res) => {
  const q = "SELECT * FROM teachers";
  db.query(q, (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(result.splice(0, 15));
  });
};

const addTeacher = (req, res) => {
  const q =
    "INSERT INTO teachers (teacherName, teacherIndex, contactNumber, address, age, qualification, tic) VALUES (?,?,?,?,?,?,?)";
  const values = [
    req.body.teacherName,
    req.body.teacherIndex,
    req.body.contactNumber,
    req.body.address,
    req.body.age,
    req.body.qualification,
    req.body.tic,
  ];

  db.query(q, values, (err, result) => {
    if (err) return res.status(500).json(err);
    return res
      .status(200)
      .json({ message: "Add teacher successfully", data: result });
  });
};
const getTeacher = (req, res) => {
  const q = "SELECT * FROM teachers WHERE idTeacher = ?";
  db.query(q, req.params.idTeacher, (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(result);
  });
};
const updateTeacher = (req, res) => {
  const id = req.params.idTeacher;
  const q =
    "UPDATE teachers SET teacherName = ?,teacherIndex = ?, contactNumber = ?, address = ?, age = ?, qualification = ?, tic = ? WHERE idTeacher = ?";
  const values = [
    req.body.teacherName,
    req.body.teacherIndex,
    req.body.contactNumber,
    req.body.address,
    req.body.age,
    req.body.qualification,
    req.body.tic,
    id,
  ];
  db.query(q, values, (err, result) => {
    if (err) return res.status(500).json(err);
    return res
      .status(200)
      .json({ message: "Update teacher successfully", data: result });
  });
};
const deleteTeacher = (req, res) => {
  const q = "DELETE FROM teachers WHERE teacherIndex = ?";
  db.query(q, req.params.teacherIndex, (err, result) => {
    if (err) return res.status(500).json(err);
    return res
      .status(200)
      .json({ message: "Delete teacher successfully", data: result });
  });
};
export default {
  getAllTeachers,
  addTeacher,
  getTeacher,
  updateTeacher,
  deleteTeacher,
};
