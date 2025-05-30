const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const ensureAuth = require('../middlewares/authMiddleware');
const pdfController = require('../controllers/pdfController');

router.get('/report/pdf', ensureAuth, pdfController.generateTaskReport);

// CRUD routes with ensuring authentication
router.post('/', ensureAuth, taskController.createTask);
router.get('/', ensureAuth, taskController.getTasks);
router.get('/:id', ensureAuth, taskController.getTaskById);
router.put('/:id', ensureAuth, taskController.updateTask);
router.delete('/:id', ensureAuth, taskController.deleteTask);

module.exports = router;
