import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../src/firebaseConfig.js';
import Login from './Login.jsx';
import Logout from './Logout.jsx';
import Board from '../pages/board.jsx';

function Account() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        navigate(`/${user.uid}/board`);
      } else {
        setUser(null);
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div>
      {user ? (
        <div>
          <Board />
          <Logout />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Account;
