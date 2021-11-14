import { Navigate } from 'react-router-dom'

import Navigation from '../components/Navigation'
import TaskForm from '../components/TaskForm'

const Create = () => {
    const token = localStorage.getItem('authToken')

    return token !== null ? (
        <div className='page'>
            <Navigation />
            <TaskForm />
        </div>
    ) : (
        <Navigate to='/login' />
    )
}

export default Create
