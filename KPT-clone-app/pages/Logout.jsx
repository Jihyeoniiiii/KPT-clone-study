import React from 'react';
import { auth } from '../src/firebaseConfig.js';
import { signOut } from 'firebase/auth';

function Logout() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('로그아웃 성공');
    } catch (error) {
      console.error('로그아웃 실패', error.message);
    }
  };

  return (
    <button onClick={handleLogout}>로그아웃</button>
  );
}

export default Logout;
