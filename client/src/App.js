import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from './pages/Home'
import CreatedPage from './pages/Created'
import CreatePage from './pages/Create'
import LoginPage from './pages/Login'
import RegistrationPage from './pages/Registration'
import ErrorPage from './pages/Error'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/created' element={<CreatedPage />} />
                <Route path='/create' element={<CreatePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/registration' element={<RegistrationPage />} />
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
