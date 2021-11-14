import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import TaskItem from './TaskItem'
import TasksFilters from './TasksFilters'
import { setTasks, setTask } from '../store/actions/tasksActions'

const AssignedTasks = () => {
    const tasks = useSelector((state) => state.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
        const getTask = async (taskId) => {
            const response = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/task/${taskId}`
            )
            const data = await response.json()

            if (data.success) {
                dispatch(setTask(data.task))
            }
        }

        const getTasks = async () => {
            const token = localStorage.getItem('authToken')

            const response = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/task/user/assigned`,
                {
                    method: 'POST',
                    headers: {
                        token: token,
                    },
                }
            )
            const data = await response.json()

            if (data.success) {
                data.tasks.forEach((taskId) => {
                    getTask(taskId)
                })
            }
        }

        dispatch(setTasks([]))
        getTasks()
    }, [dispatch])

    return (
        <div style={{ display: 'grid', marginTop: '50px' }}>
            <div style={{ margin: 'auto', width: '512px' }}>
                {tasks.length >= 2 ? <TasksFilters /> : null}
                {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        id={task.id}
                        isEditable={true}
                        isDeleteable={false}
                    />
                ))}
            </div>
        </div>
    )
}

export default AssignedTasks
