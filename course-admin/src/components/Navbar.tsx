import { NavLink } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'

const Navbar = () => {
  const { isAuthenticated, isTeacher, displayName, login, logout } = useAuth()

  return (
    <nav>
        <NavLink to = "/">Home</NavLink>
        <NavLink to = "/courses">Courses</NavLink>
        {isTeacher && <NavLink to = "/courses/create">Create</NavLink>}
        <span className="auth-status">
          {isAuthenticated ? `${displayName} (${isTeacher ? 'Teacher' : 'Student'})` : 'Not signed in'}
        </span>
        <button className="auth-button" onClick={isAuthenticated ? logout : login}>
          {isAuthenticated ? 'Sign out' : 'Sign in with Entra ID'}
        </button>
    </nav>
  );
}

export default Navbar
