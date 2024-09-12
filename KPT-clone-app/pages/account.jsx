import React, { useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../src/firebaseConfig.js';
import Login from './login.jsx';
import Logout from './logout.jsx';
import Board from './board.jsx';

function Account() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        navigate(`/${user.uid}/board`);
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
