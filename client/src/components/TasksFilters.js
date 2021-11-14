import { useSelector, useDispatch } from 'react-redux'

import { setTasks } from '../store/actions/tasksActions'

import './TasksFilters.css'

const TasksFilters = () => {
    const tasks = useSelector((state) => state.tasks)
    const dispatch = useDispatch()

    const statusFilter = () => {
        if (tasks.length >= 2) {
            const oldListFirstItem = tasks[0].id

            let newList = tasks.sort((a, b) => b.status - a.status)

            if (oldListFirstItem === newList[0].id) {
                newList = tasks.sort((a, b) => a.status - b.status)
            }

            dispatch(setTasks([...newList]))
        }
    }

    const dateFilter = () => {
        if (tasks.length >= 2) {
            const oldListFirstItem = tasks[0].id

            let newList = tasks.sort(
                (a, b) => new Date(b.due_date) - new Date(a.due_date)
            )

            if (oldListFirstItem === newList[0].id) {
                newList = tasks.sort(
                    (a, b) => new Date(a.due_date) - new Date(b.due_date)
                )
            }

            dispatch(setTasks([...newList]))
        }
    }

    return (
        <div className='filters'>
            <h1>Filters</h1>
            <button className='btn btn-light btn-filter' onClick={statusFilter}>
                Status
            </button>
            <button className='btn btn-light btn-filter' onClick={dateFilter}>
                Date
            </button>
        </div>
    )
}

export default TasksFilters
