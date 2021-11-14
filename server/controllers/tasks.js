const connection = require('../config/database')

const create = (req, res) => {
    const { title, description, dueDate } = req.body
    const authorId = req.user.id

    if (!title || !description || !dueDate) {
        return res
            .status(400)
            .send({ success: false, msg: 'Fill all fields in the form' })
    }

    connection.query(
        'INSERT INTO tasks (title, description, due_date, author_id) VALUES (?, ?, ?, ?)',
        [title, description, dueDate, authorId],
        (err, result) => {
            if (err) {
                res.status(400).send({ success: false, msg: err.message })
            } else {
                const task = {
                    id: result.insertId,
                    title,
                    description,
                    dueDate,
                    authorId,
                }

                res.status(201).send({ success: true, task })
            }
        }
    )
}

const getList = (req, res) => {
    connection.query('SELECT * FROM tasks', (err, result) => {
        if (err) {
            res.status(400).send({
                success: false,
                msg: 'Something went wrong',
            })
        } else {
            res.status(200).send({
                success: true,
                tasks: result,
            })
        }
    })
}

const getById = (req, res) => {
    const { id } = req.params

    connection.query(
        'SELECT * FROM tasks WHERE id = ?',
        [id],
        (err, result) => {
            if (err) {
                res.status(400).send({
                    success: false,
                    msg: 'Something went wrong',
                })
            } else {
                if (result.length) {
                    res.status(200).send({
                        success: true,
                        task: result[0],
                    })
                } else {
                    res.status(404).send({
                        success: false,
                        msg: 'Task could not found',
                    })
                }
            }
        }
    )
}

const updateById = (req, res) => {
    const { id } = req.params
    const { title, description, dueDate, status } = req.body
    const authorId = req.user.id

    if (!title.length || !description.length || !dueDate.length || !status) {
        return res
            .status(400)
            .send({ success: false, msg: 'Fill all fields in the form' })
    }

    connection.query(
        'UPDATE tasks SET title = ?, description = ?, due_date = ?, status = ? WHERE id = ? AND author_id = ?',
        [title, description, dueDate, status, id, authorId],
        (err, result) => {
            if (err) {
                res.status(400).send({
                    success: false,
                    msg: 'Something went wrong',
                })
            } else {
                if (result.changedRows) {
                    const task = {
                        id,
                        title,
                        description,
                        dueDate,
                        status,
                    }

                    res.status(201).send({ success: true, task })
                } else {
                    res.status(201).send({
                        success: false,
                        msg: 'Task could not found or you do not have permission',
                    })
                }
            }
        }
    )
}

const deleteById = (req, res) => {
    const { id } = req.params
    const authorId = req.user.id

    connection.query(
        'DELETE FROM tasks WHERE id = ? AND author_id = ?',
        [id, authorId],
        (err, result) => {
            if (err) {
                res.status(400).send({
                    success: false,
                    msg: 'Something went wrong',
                })
            } else {
                if (result.affectedRows) {
                    res.status(201).send({
                        success: true,
                        msg: 'Task successfully deleted',
                    })
                } else {
                    res.status(404).send({
                        success: false,
                        msg: 'Task could not found or you do not have permission',
                    })
                }
            }
        }
    )
}

const assignTaskForUser = (req, res) => {
    const authorId = req.user.id
    const { userId, taskId } = req.body

    connection.query(
        'SELECT * FROM tasks WHERE id = ? AND author_id = ?',
        [taskId, authorId],
        (err, result) => {
            if (err) {
                res.status(400).send({
                    success: false,
                    msg: 'Something went wrong',
                })
            } else {
                if (result.length) {
                    connection.query(
                        'INSERT INTO users_tasks (user_id, task_id) VALUES (?, ?)',
                        [userId, taskId],
                        (err, result) => {
                            if (err) {
                                res.status(400).send({
                                    success: false,
                                    msg: 'Something went wrong',
                                })
                            } else {
                                if (result.affectedRows) {
                                    res.status(201).send({
                                        success: true,
                                        msg: `Task ${taskId} successfully assigned for user ${userId}`,
                                    })
                                } else {
                                    res.status(400).send({
                                        success: false,
                                        msg: `Somthing went wrong`,
                                    })
                                }
                            }
                        }
                    )
                } else {
                    res.status(404).send({
                        success: false,
                        msg: 'Task could not found or you do not have permission',
                    })
                }
            }
        }
    )
}

const getCreatedTasks = (req, res) => {
    const authorId = req.user.id

    connection.query(
        'SELECT * FROM tasks WHERE author_id = ?',
        [authorId],
        (err, result) => {
            if (err) {
                res.status(400).send({
                    success: false,
                    msg: 'Something went wrong',
                })
            } else {
                res.status(200).send({
                    success: true,
                    tasks: result,
                })
            }
        }
    )
}

const getAssignedTasks = (req, res) => {
    const userId = req.user.id

    connection.query(
        'SELECT task_id FROM users_tasks WHERE user_id = ?',
        [userId],
        (err, result) => {
            if (err) {
                res.status(400).send({
                    success: false,
                    msg: 'Something went wrong',
                })
            } else {
                const tasks = result.map((element) => element.task_id)

                res.status(200).send({
                    success: true,
                    tasks,
                })
            }
        }
    )
}

const updateTaskStatus = (req, res) => {
    const userId = req.user.id
    const { taskId, status } = req.body

    connection.query(
        'SELECT * FROM users_tasks WHERE user_id = ? AND task_id = ?',
        [userId, taskId],
        (err, result) => {
            if (err) {
                res.status(400).send({
                    success: false,
                    msg: 'Something went wrong',
                })
            } else {
                if (result.length) {
                    connection.query(
                        'UPDATE tasks SET status = ? WHERE id = ?',
                        [status, taskId],
                        (err, result) => {
                            if (err) {
                                res.status(400).send({
                                    success: false,
                                    msg: 'Something went wrong',
                                })
                            } else {
                                if (result.affectedRows) {
                                    res.status(200).send({ success: true })
                                } else {
                                    res.status(400).send({
                                        success: false,
                                        msg: 'Status could not changed',
                                    })
                                }
                            }
                        }
                    )
                } else {
                    res.status(404).send({
                        success: false,
                        msg: 'Task could not found',
                    })
                }
            }
        }
    )
}

module.exports = {
    create,
    getList,
    getById,
    updateById,
    deleteById,
    assignTaskForUser,
    getCreatedTasks,
    getAssignedTasks,
    updateTaskStatus,
}
