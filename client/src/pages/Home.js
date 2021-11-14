import { Navigate } from 'react-router-dom'

import Navigation from '../components/Navigation'
import AssignedTasks from '../components/AssignedTasks'

const Home = () => {
    const token = localStorage.getItem('authToken')

    return token !== null ? (
        <div className='page'>
            <Navigation />
            <AssignedTasks />
        </div>
    ) : (
        <Navigate to='/login' />
    )
}

export default Home
