import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../context/AuthContext'; // ✅ use the hook

const Navbar = () => {
  const { user, logout } = useAuth(); // ✅ use the hook instead of useContext
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <Link to='/' className='navbar-logo'>
          My E-Commerce
        </Link>
        <ul className='navbar-menu'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/products'>Products</Link>
          </li>
          <li>
            <Link to='/cart'>Cart</Link>
          </li>
          <li>
            <Link to='/orders'>Orders</Link>
          </li>

          {user ? (
            <>
              <li>
                <span>Welcome, {user.username}</span>
              </li>
              <li>
                <button onClick={handleLogout} className='logout-btn'>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to='/login'>Login</Link>
              </li>
              <li>
                <Link to='/register'>Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
