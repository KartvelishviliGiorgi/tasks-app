import { Navigate } from 'react-router-dom'

import LoginForm from '../components/LoginForm'

const Login = () => {
    const token = localStorage.getItem('authToken')

    return !token ? (
        <div className='page'>
            <LoginForm />
        </div>
    ) : (
        <Navigate to='/' />
    )
}

export default Login
