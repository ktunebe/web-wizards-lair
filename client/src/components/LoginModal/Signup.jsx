import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_PROFILE } from '../../utils/mutations';

import Auth from '../../utils/auth';
import AvatarBank from './AvatarBank';

const Signup = () => {
  const [selectedAvatar, setSelectedAvatar] = useState('')
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    avatar: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_PROFILE);

  // Handle when you click on an avatar to select it (will run onClick of any avatar image)
  const handleSelectAvatar = (e) => {
    const avatarUrl = e.target.getAttribute('src');

    // Update selectedAvatar first
    setSelectedAvatar(avatarUrl);
  
    // Use the callback form of setFormState to ensure you have the latest state
    setFormState(prevState => ({
      ...prevState,
      avatar: avatarUrl
    }));
  
  }

  useEffect(() => {
    console.log(formState)
  }, [formState])

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your username"
                  name="name"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <AvatarBank 
                  selectedAvatar={selectedAvatar}
                  setSelectedAvatar={setSelectedAvatar}
                  handleSelectAvatar={handleSelectAvatar}
                />
                <button
                  className="btn btn-block btn-info"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
      
    </main>
  );
};

export default Signup;
