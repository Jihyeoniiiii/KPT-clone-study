import React, { useState } from 'react';
import { auth } from '../src/firebaseConfig.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import styled from 'styled-components';
import { css } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Input = styled.input`
  width: 300px;
  height: 60px;
  background-color: #EEEEEE;
  border: none;
  border-radius: 20px;
  margin-bottom: 10px;
  padding-left: 10px;
`;

const LogoArea = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0px 0px 10px -30px;
  gap: 10px;
`;

const ButtonStyle = css`
  margin-top: 10px;
  background-color: #EEEEEE;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #fff79afa;
    border: none;
  }
`;

const Button = styled.button`
  ${ButtonStyle}
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('로그인 성공');
    } catch (error) {
      console.error('로그인 실패', error.message);
    }
  };

  return (
    <Container>
      <LogoArea>
        <img src='https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f34c.svg' width={70} />
        <h2>baNaNa</h2>
      </LogoArea>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
      />
      <Button onClick={handleLogin}>로그인</Button>
    </Container>
  );
}

export default Login;
