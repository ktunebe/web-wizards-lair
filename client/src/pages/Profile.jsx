import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';
import AuthCheck from '../utils/AuthCheck'

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
  console.log(user.solutions)
  
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

  const userProgress = (user.score / 10 ) * 100

  return (
    <div className='container nes-container with-title text-white is-centered'>
    <p className="title nes-text !bg-jet " style={{ fontSize: '2rem' }}>{user.username}</p>
        <div className='flex gap-4 justify-center items-center'>
          <img className='nes-container is-rounded w-1/2' src={user.avatar}></img> 
          <div className='flex flex-col w-1/2'>
            <h2 className='py-2 text-base sm:text-xl md:text-2xl'>Dungeon Levels Conquered: {user.score}</h2>
            <progress className="nes-progress is-success" value={userProgress} max="100"></progress>
          </div>
        </div>
      <div> 
        <ul className='pt-8'>
        {user.solutions?.map(solution => {
          return (
            <li className='py-4'>
              <h3 className='text-xl sm:text-2xl'>{solution.problem.title}</h3>
              <p className='sm:text-base py-4'>{solution.solution}</p>
            </li>
          )
        })}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
