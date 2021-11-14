import { useState } from 'react'

import InputComponent from './InputComponent'

const TaskForm = () => {
    const token = localStorage.getItem('authToken')

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [errMessage, setErrMessage] = useState('')
    const [emailsList, setEmailsList] = useState('')

    const getEmails = (string) => {
        const emailsString = string.replace(/ +(?= )/g, '')

        return emailsString.split(' ')
    }

    const assignTasks = (taskId, emails) => {
        emails.forEach(async (email) => {
            if (email.length >= 8) {
                const userResponse = await fetch(
                    `${process.env.REACT_APP_SERVER_URL}/user/find/${email}`
                )
                const userData = await userResponse.json()

                if (userData.success) {
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', token },
                        body: JSON.stringify({
                            userId: userData.user.id,
                            taskId,
                        }),
                    }

                    fetch(
                        `${process.env.REACT_APP_SERVER_URL}/task/assign`,
                        requestOptions
                    )
                    // const data = await response.json()
                }
            }
        })
    }

    const createTask = async () => {
        const task = {
            title,
            description,
            dueDate,
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', token },
            body: JSON.stringify(task),
        }

        const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/task`,
            requestOptions
        )
        const data = await response.json()

        if (!data.success) {
            setErrMessage(data.msg)
        }

        if (data.success) {
            const emails = getEmails(emailsList)
            assignTasks(data.task.id, emails)
        }

        setTitle('')
        setDescription('')
        setDueDate('')
        setEmailsList('')
    }

    return (
        <div className='container' style={{ padding: '5% 20%' }}>
            {errMessage && <div className='error-box'>{errMessage}</div>}
            <div className='mb-3'>
                <InputComponent
                    type='text'
                    placeHolder='Title'
                    value={title}
                    isRequired={true}
                    onChangeFunction={setTitle}
                />
            </div>
            <div className='mb-3'>
                <InputComponent
                    type='text'
                    placeHolder='description'
                    value={description}
                    isRequired={true}
                    onChangeFunction={setDescription}
                />
            </div>
            <div className='mb-3'>
                <InputComponent
                    type='date'
                    placeHolder='none'
                    value={dueDate}
                    isRequired={true}
                    onChangeFunction={setDueDate}
                />
            </div>
            <div className='mb-3'>
                <InputComponent
                    type='text'
                    placeHolder='Input emails with spaces'
                    value={emailsList}
                    isRequired={true}
                    onChangeFunction={setEmailsList}
                />
            </div>
            <button className='btn btn-success' onClick={createTask}>
                Submit
            </button>
        </div>
    )
}

export default TaskForm
