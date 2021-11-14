import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import InputComponent from './InputComponent'

import './LoginForm.css'

const LoginForm = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMessage, setErrMessage] = useState('')

    const submitForm = (e) => {
        e.preventDefault()

        const user = {
            email,
            password,
        }

        setEmail('')
        setPassword('')

        loginUser(user)
    }

    const loginUser = async (user) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        }

        const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/user/signin`,
            requestOptions
        )
        const data = await response.json()

        if (data.success) {
            localStorage.setItem('authToken', data.token)

            navigate('/')
        } else {
            setErrMessage(data.msg)
        }
    }

    return (
        <section className='login-section'>
            <div className='login-form'>
                <form onSubmit={(e) => submitForm(e)}>
                    {errMessage && (
                        <div className='error-box'>{errMessage}</div>
                    )}
                    <h2 className='text-center'>Log in</h2>
                    <div className='form-group'>
                        <InputComponent
                            type='email'
                            placeHolder='name@example.com'
                            value={email}
                            isRequired={true}
                            onChangeFunction={setEmail}
                        />
                    </div>
                    <div className='form-group'>
                        <InputComponent
                            type='password'
                            placeHolder='name@example.com'
                            value={password}
                            isRequired={true}
                            onChangeFunction={setPassword}
                        />
                    </div>
                    <div className='form-group'>
                        <button type='submit' className='btn btn-primary'>
                            Log in
                        </button>
                    </div>
                </form>
                <div className='text-center'>
                    <Link to='/registration'>
                        <p style={{ cursor: 'pointer' }}>Create an Account</p>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default LoginForm
