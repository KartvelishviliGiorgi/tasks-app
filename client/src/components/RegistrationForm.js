import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import InputComponent from './InputComponent'

import './RegistrationForm.css'

const RegistrationForm = () => {
    const navigate = useNavigate()

    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errMessage, setErrMessage] = useState('')

    const comparePasswords = () => {
        if (!password || password !== confirmPassword) {
            setErrMessage('Passwords are not same')

            setPassword('')
            setConfirmPassword('')

            return false
        }
        return true
    }

    const submitForm = (e) => {
        e.preventDefault()

        if (!comparePasswords()) return

        const user = {
            fullname,
            email,
            password,
        }

        setFullname('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')

        registerUser(user)
    }

    const registerUser = async (user) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        }

        const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/user/signup`,
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
        <section className='registration-section'>
            <div className='registration-form'>
                <form onSubmit={(e) => submitForm(e)}>
                    {errMessage && (
                        <div className='error-box'>{errMessage}</div>
                    )}
                    <h2 className='text-center'>Registration</h2>
                    <div className='form-group'>
                        <InputComponent
                            type='text'
                            placeHolder='Full Name'
                            value={fullname}
                            isRequired={true}
                            onChangeFunction={setFullname}
                        />
                    </div>
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
                        <InputComponent
                            type={'password'}
                            placeHolder={'Confirm password'}
                            value={confirmPassword}
                            isRequired={true}
                            onChangeFunction={setConfirmPassword}
                        />
                    </div>
                    <div className='form-group'>
                        <button type='submit' className='btn btn-primary'>
                            Sign Up
                        </button>
                    </div>
                </form>
                <div className='text-center'>
                    <Link to='/login'>
                        <p style={{ cursor: 'pointer' }}>Sign in</p>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default RegistrationForm
