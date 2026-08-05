const studentModel = require('../models/studentModel');

function validateStudentData(data) {
  const errors = [];

  if (!data.name || !String(data.name).trim()) {
    errors.push('Student name is required.');
  }
  if (!['Male', 'Female', 'Other'].includes(data.gender)) {
    errors.push('Gender must be Male, Female, or Other.');
  }
  const grade = Number(data.grade);
  if (!Number.isInteger(grade) || grade < 6 || grade > 12) {
    errors.push('Grade must be a number between 6 and 12.');
  }
  if (!['A', 'B', 'C'].includes(data.section)) {
    errors.push('Section must be A, B, or C.');
  }
  if (!data.parent_name || !String(data.parent_name).trim()) {
    errors.push('Parent name is required.');
  }
  if (!/^\d{10}$/.test(data.mobile_number || '')) {
    errors.push('Mobile number must be exactly 10 digits.');
  }
  if (!data.admission_date || Number.isNaN(Date.parse(data.admission_date))) {
    errors.push('Admission date is required and must be a valid date.');
  }

  return errors;
}

function getDashboardStats(req, res) {
  res.json(studentModel.getDashboardStats());
}

function listStudents(req, res) {
  const { search, grade, section, gender, sortBy, order } = req.query;
  const students = studentModel.getAllStudents({ search, grade, section, gender, sortBy, order });
  res.json(students);
}

function getStudent(req, res) {
  const student = studentModel.getStudentByStudentId(req.params.studentId);
  if (!student) return res.status(404).json({ error: 'Student not found.' });
  res.json(student);
}

function addStudent(req, res) {
  const errors = validateStudentData(req.body);
  if (errors.length) return res.status(400).json({ errors });
  const student = studentModel.createStudent(req.body);
  res.status(201).json(student);
}

function editStudent(req, res) {
  const existing = studentModel.getStudentByStudentId(req.params.studentId);
  if (!existing) return res.status(404).json({ error: 'Student not found.' });

  const errors = validateStudentData(req.body);
  if (errors.length) return res.status(400).json({ errors });

  const student = studentModel.updateStudent(req.params.studentId, req.body);
  res.json(student);
}

function removeStudent(req, res) {
  const deleted = studentModel.deleteStudent(req.params.studentId);
  if (!deleted) return res.status(404).json({ error: 'Student not found.' });
  res.status(204).send();
}

module.exports = { listStudents, getStudent, addStudent, editStudent, removeStudent, getDashboardStats };
