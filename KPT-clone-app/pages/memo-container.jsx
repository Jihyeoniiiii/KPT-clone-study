import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MemoList from "../pages/memo-list.jsx";
import { auth } from '../src/firebaseConfig.js';

const Container = styled.div`
  width: 700px;
  height: 400px;
  background-color: ${(props) => props.$backgroundColor};
  position: relative;
`;

const Title = styled.h3`
  margin: 0;
  padding: 10px;
  text-align: left;
`;

function ContainerWithMemos({ backgroundColor, title }) {
  const [memos, setMemos] = useState([]);
  const [drag, setDrag] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.email) {
        const emailPrefix = user.email.split('@')[0];  // 이메일 앞부분 추출
        setUserEmail(emailPrefix);
      }
    });

    return () => unsubscribe();
  }, []);

  function handleAttach(e) {
    e.preventDefault();
    if (drag !== null) return; // 드래그 중에는 메모 추가를 방지

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - 60;
    const y = e.clientY - rect.top - 75;

    const isOverlap = memos.some((memo) => {
      const memoRect = {
        left: memo.x - 60,
        top: memo.y - 75,
        right: memo.x + 60,
        bottom: memo.y + 75,
      };
      return (
        x >= memoRect.left &&
        x <= memoRect.right &&
        y >= memoRect.top &&
        y <= memoRect.bottom
      );
    });

    if (!isOverlap) {
      setMemos([...memos, { text: "", x, y, color: getRandomColor() }]);
    }
  }

  function handleMouseDown(index) {
    return (e) => {
      e.preventDefault(); // 드래그 시작
      setDrag(index);
      const rect = e.currentTarget.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left - 60,
        y: e.clientY - rect.top - 75,
      });
    };
  }

  function handleMouseMove(e) {
    e.preventDefault();
    if (drag !== null) {
      const rect = e.currentTarget.getBoundingClientRect();
      const newX = e.clientX - rect.left - 60 - dragOffset.x;
      const newY = e.clientY - rect.top - 75 - dragOffset.y;

      setMemos(
        memos.map((memo, index) =>
          index === drag ? { ...memo, x: newX, y: newY } : memo
        )
      );
    }
  }

  function handleMouseUp() {
    setDrag(null);
  }

  function handleChange(index, text) {
    setMemos((prevMemos) =>
      prevMemos.map((memo, i) =>
        i === index ? { ...memo, text } : memo
      )
    );
  }

  function getRandomColor() {
    const getRandomValue = () => Math.floor(Math.random() * 56) + 200;
    const r = getRandomValue();
    const g = getRandomValue();
    const b = getRandomValue();
    
    return `rgb(${r}, ${g}, ${b})`;
  }
  

  return (
    <Container
      $backgroundColor={backgroundColor}
      onMouseDown={handleAttach}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Title>{title}</Title>
      <MemoList
        memos={memos}
        onChange={handleChange}
        onMouseDown={handleMouseDown}
        userEmail={userEmail}
      />
    </Container>
  );
}

export default ContainerWithMemos;
