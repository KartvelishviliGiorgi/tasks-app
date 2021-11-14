const express = require('express')
const router = express.Router()

const taskController = require('../controllers/tasks')
const auth = require('../middleware/auth')

router.post('/', auth, taskController.create)
router.get('/', taskController.getList)
router.get('/:id', taskController.getById)
router.put('/:id', auth, taskController.updateById)
router.delete('/:id', auth, taskController.deleteById)
router.post('/assign', auth, taskController.assignTaskForUser)
router.post('/user/created', auth, taskController.getCreatedTasks)
router.post('/user/assigned', auth, taskController.getAssignedTasks)
router.post('/edit/status', auth, taskController.updateTaskStatus)

module.exports = router
