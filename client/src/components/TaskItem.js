import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setTasks } from '../store/actions/tasksActions'

import './TaskItem.css'

const TaskItem = ({ id, isEditable, isDeleteable }) => {
    const token = localStorage.getItem('authToken')

    const [taskStatus, setTaskStatus] = useState(0)

    const tasks = useSelector((state) => state.tasks)
    const task = tasks.find((task) => task.id === id)

    const dispatch = useDispatch()

    useEffect(() => {
        setTaskStatus(task.status)
    }, [task.status])

    const taskColor = (status) => {
        const result = parseInt(status)

        switch (result) {
            case 1: {
                return 'bg-warning'
            }
            case 2: {
                return 'bg-success'
            }
            default: {
                return 'bg-danger'
            }
        }
    }

    const changeTaskStatus = async (id, status) => {
        const body = { taskId: id, status }

        if (token) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', token },
                body: JSON.stringify(body),
            }

            const response = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/task/edit/status`,
                requestOptions
            )
            const data = await response.json()

            if (data.success) {
                setTaskStatus(status)

                const newList = tasks.map((item) => {
                    if (item.id === task.id) {
                        const updatedTask = task
                        updatedTask.status = status

                        return updatedTask
                    }

                    return item
                })

                dispatch(setTasks(newList))
            }
        }
    }

    const deleteTask = async () => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', token },
        }

        const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/task/${id}`,
            requestOptions
        )
        const data = await response.json()

        if (data.success) {
            const updatedList = tasks.filter((task) => task.id !== id)

            dispatch(setTasks(updatedList))
        }
    }

    return (
        <div className={`list-group-item task-item ${taskColor(taskStatus)}`}>
            <h5>{task.title}</h5>
            <p className='task-description'>{task.description}</p>
            <span>{task.due_date}</span>

            <div className='status-select-box'>
                <select
                    disabled={!isEditable}
                    className='custom-select'
                    value={taskStatus}
                    onChange={(e) => changeTaskStatus(id, e.target.value)}>
                    <option value='0'>Not Done</option>
                    <option value='1'>In Progress</option>
                    <option value='2'>Done</option>
                </select>
                {isDeleteable && (
                    <button
                        className='btn btn-light btn-task-delete'
                        onClick={deleteTask}>
                        DELETE
                    </button>
                )}
            </div>
        </div>
    )
}

export default TaskItem
