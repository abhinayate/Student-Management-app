const db = require('../database/db');

const ALLOWED_SORT_FIELDS = ['student_id', 'name', 'grade', 'section', 'gender', 'admission_date'];

function generateStudentId(rowId) {
  return 'STU' + String(rowId).padStart(4, '0');
}

const insertStmt = db.prepare(`
  INSERT INTO students (student_id, name, gender, grade, section, parent_name, mobile_number, admission_date)
  VALUES (@student_id, @name, @gender, @grade, @section, @parent_name, @mobile_number, @admission_date)
`);

const updateStudentIdStmt = db.prepare('UPDATE students SET student_id = ? WHERE id = ?');

function getStudentByStudentId(studentId) {
  return db.prepare('SELECT * FROM students WHERE student_id = ?').get(studentId);
}

const createStudent = db.transaction((data) => {
  const info = insertStmt.run({ ...data, student_id: 'PENDING' });
  const studentId = generateStudentId(info.lastInsertRowid);
  updateStudentIdStmt.run(studentId, info.lastInsertRowid);
  return getStudentByStudentId(studentId);
});

function getAllStudents({ search, grade, section, gender, sortBy, order } = {}) {
  let query = 'SELECT * FROM students WHERE 1=1';
  const params = {};

  if (search) {
    query += ' AND (name LIKE @search OR student_id LIKE @search OR parent_name LIKE @search OR mobile_number LIKE @search)';
    params.search = `%${search}%`;
  }
  if (grade) {
    query += ' AND grade = @grade';
    params.grade = grade;
  }
  if (section) {
    query += ' AND section = @section';
    params.section = section;
  }
  if (gender) {
    query += ' AND gender = @gender';
    params.gender = gender;
  }

  const sortField = ALLOWED_SORT_FIELDS.includes(sortBy) ? sortBy : 'id';
  const sortOrder = order && order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
  query += ` ORDER BY ${sortField} ${sortOrder}`;

  return db.prepare(query).all(params);
}

function updateStudent(studentId, data) {
  db.prepare(`
    UPDATE students SET
      name = @name,
      gender = @gender,
      grade = @grade,
      section = @section,
      parent_name = @parent_name,
      mobile_number = @mobile_number,
      admission_date = @admission_date
    WHERE student_id = @student_id
  `).run({ ...data, student_id: studentId });
  return getStudentByStudentId(studentId);
}

function deleteStudent(studentId) {
  const result = db.prepare('DELETE FROM students WHERE student_id = ?').run(studentId);
  return result.changes > 0;
}

function getDashboardStats() {
  const total = db.prepare('SELECT COUNT(*) as count FROM students').get().count;
  const byGender = db.prepare('SELECT gender, COUNT(*) as count FROM students GROUP BY gender').all();
  const byGrade = db
    .prepare('SELECT grade, COUNT(*) as count FROM students GROUP BY grade ORDER BY grade')
    .all();
  const bySection = db
    .prepare('SELECT section, COUNT(*) as count FROM students GROUP BY section ORDER BY section')
    .all();
  const byMonth = db
    .prepare(
      `SELECT strftime('%Y-%m', admission_date) as month, COUNT(*) as count
       FROM students GROUP BY month ORDER BY month`
    )
    .all();

  return { total, byGender, byGrade, bySection, byMonth };
}

module.exports = {
  createStudent,
  getAllStudents,
  getStudentByStudentId,
  updateStudent,
  deleteStudent,
  getDashboardStats,
};
