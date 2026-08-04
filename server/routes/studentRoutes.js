const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentController');

router.get('/stats/summary', controller.getDashboardStats);
router.get('/', controller.listStudents);
router.get('/:studentId', controller.getStudent);
router.post('/', controller.addStudent);
router.put('/:studentId', controller.editStudent);
router.delete('/:studentId', controller.removeStudent);

module.exports = router;
