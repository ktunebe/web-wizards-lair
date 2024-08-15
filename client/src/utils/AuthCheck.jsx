import Auth from './auth'
import { useNavigate } from 'react-router-dom'

const AuthCheck = ({ children }) => {
    const navigate = useNavigate()
    if (!Auth.loggedIn()) {
        navigate('/')
    }
    return children
}

export default AuthCheck