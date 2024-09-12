import React from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../src/firebaseConfig.js';
import Button from '../component/button.jsx';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('로그아웃 성공');
      navigate('/'); // 로그아웃 후 로그인 페이지로 리다이렉트
    } catch (error) {
      console.error('로그아웃 실패', error.message);
    }
  };

  return (
    <Button onClick={handleLogout}>로그아웃</Button>
  );
}

export default Logout;
