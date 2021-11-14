import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import TaskItem from './TaskItem'
import TasksFilters from './TasksFilters'
import { setTasks } from '../store/actions/tasksActions'

const CreatedTasks = () => {
    const tasks = useSelector((state) => state.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
        const getTasks = async () => {
            const token = localStorage.getItem('authToken')

            const response = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/task/user/created`,
                {
                    method: 'POST',
                    headers: {
                        token: token,
                    },
                }
            )
            const data = await response.json()

            if (data.success) {
                dispatch(setTasks(data.tasks))
            }
        }

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
                        isEditable={false}
                        isDeleteable={true}
                    />
                ))}
            </div>
        </div>
    )
}

export default CreatedTasks
