import { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import LoginModal from '../components/LoginModal';

const Home = () => {
 

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          <h1>Home</h1>
        </div>
      </div>
      <LoginModal />
    </main>
  );
};

export default Home;
