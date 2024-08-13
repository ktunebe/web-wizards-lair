import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { userId } = useParams();

  // If there is no `userId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(
    userId ? QUERY_SINGLE_USER : QUERY_ME,
    {
      variables: { userId },
    }
  );

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const user = data?.me || data?.user || {};
 console.log(user)
  // Use React Router's `<Redirect />` component to redirect to personal user page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === userId) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see your user page. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }

  return (
    <div className='container'>
      <div>
      <h1 className="card-header">
        {user.username}
      </h1>
      <div>
        <h2>Dungeon Levels Conquered {user.score}</h2>
        <img src={user.avatar}></img>
      </div>
      </div>
      <div>
        <ul>
        {user.solutions.map(solution => {
          return (
            <li>
              <h3>{solution.problem.title}</h3>
              <p>{solution.solution}</p>
            </li>
          )
        })}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
