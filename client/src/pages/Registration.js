import { Navigate } from 'react-router-dom'

import RegistrationForm from '../components/RegistrationForm'

const Registration = () => {
    const token = localStorage.getItem('authToken')

    return !token ? (
        <div className='page'>
            <RegistrationForm />
        </div>
    ) : (
        <Navigate to='/' />
    )
}

export default Registration
