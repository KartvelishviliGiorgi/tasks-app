export const setTasks = (tasks) => {
    return {
        type: 'SET_TASKS',
        payload: tasks,
    }
}

export const setTask = (task) => {
    return {
        type: 'SET_TASK',
        payload: task,
    }
}
