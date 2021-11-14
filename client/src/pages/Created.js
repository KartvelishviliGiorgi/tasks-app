import { Navigate } from 'react-router-dom'

import Navigation from '../components/Navigation'
import CreatedTasks from '../components/CreatedTasks'

const Created = () => {
    const token = localStorage.getItem('authToken')

    return token !== null ? (
        <div className='page'>
            <Navigation />
            <CreatedTasks />
        </div>
    ) : (
        <Navigate to='/login' />
    )
}

export default Created
