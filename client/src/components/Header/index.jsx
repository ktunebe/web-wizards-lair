import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-neutral-900  mb-4 py-3 flex align-center">
      <div className="container flex justify-between align-center text-center">
        <Link className="text-light" to="/">
          <h1 className="m-0 font-bold text-8xl font-pressStart" style={{ fontSize: '2rem', color: '#95A3A4' }}>
            Project 3
          </h1>
        </Link>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-primary m-2" to="/me">
                View My Profile
              </Link>
              <button className="btn btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : ''}
        </div>
      </div>
    </header>
  );
};

export default Header;
