import { useRef, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import { saveUserInformation } from '../store/actions/userActions'

import './Navigation.css'

const Navigation = () => {
    const [username, setUsername] = useState('')
    const navEl = useRef(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const displayNavigation = () => {
        const currentStatus = navEl.current.style.display

        if (currentStatus === 'none') {
            navEl.current.style.display = 'block'
        } else {
            navEl.current.style.display = 'none'
        }
    }

    const logOut = () => {
        localStorage.removeItem('authToken')

        navigate('/login')
    }

    useEffect(() => {
        const token = localStorage.getItem('authToken')

        const getUser = async () => {
            const requestOptions = {
                headers: {
                    token: token,
                },
            }
            const response = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/user/logged`,
                requestOptions
            )

            const data = await response.json()

            if (data.success) {
                dispatch(saveUserInformation(data.user))

                setUsername(data.user.fullname)
            } else {
                localStorage.removeItem('authToken')

                navigate('/login')
            }
        }

        if (token) {
            getUser()
        }
    })

    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
            <div className='container-fluid'>
                <div
                    ref={navEl}
                    style={{ display: 'none' }}
                    className='collapse navbar-collapse'>
                    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                        <li className='nav-item'>
                            <Link to='/' className='nav-item-link'>
                                <span className='nav-link active'>
                                    Assigned Tasks
                                </span>
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/created' className='nav-item-link'>
                                <span className='nav-link'>Created Tasks</span>
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/create' className='nav-item-link'>
                                <span className='nav-link'>
                                    Create New Task
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='navbar-brand'>
                    <span className='navbar-brand'>{username}</span>
                    <button className='btn btn-danger' onClick={logOut}>
                        Log out
                    </button>
                </div>
                <button
                    className='navbar-toggler'
                    type='button'
                    onClick={displayNavigation}>
                    <span className='navbar-toggler-icon'></span>
                </button>
            </div>
        </nav>
    )
}

export default Navigation
