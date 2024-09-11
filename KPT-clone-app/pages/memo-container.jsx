import React, { useState } from "react";
import styled from "styled-components";
import Memo from "./memo";

const Container = styled.div`
  width: 1600px;
  height: 400px;
  background-color: ${(props) => props.$backgroundColor};
  position: relative;
`;

const MemoContainer = styled.div`
  position: absolute;
  top: ${(props) => props.$top}px;
  left: ${(props) => props.$left}px;
  cursor: grab;
  user-select: none; // 추가: 드래그 중 텍스트 선택 방지
`;

function ContainerWithMemos({ backgroundColor }) {
  const [memos, setMemos] = useState([]);
  const [drag, setDrag] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

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

  function handleMouseDown(index, e) {
    e.preventDefault(); // 드래그 시작
    setDrag(index);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left - 60,
      y: e.clientY - rect.top - 75,
    });
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
    const newMemos = memos.map((memo, i) =>
      i === index ? { ...memo, text } : memo
    );
    setMemos(newMemos);
  }

  function getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  return (
    <Container
      $backgroundColor={backgroundColor}
      onMouseDown={handleAttach}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {memos.map((memo, index) => (
        <MemoContainer
          key={index}
          $top={memo.y}
          $left={memo.x}
          onMouseDown={(e) => handleMouseDown(index, e)}
        >
          <Memo
            value={memo.text}
            onChange={(text) => handleChange(index, text)}
            backgroundColor={memo.color}
          />
        </MemoContainer>
      ))}
    </Container>
  );
}

export default ContainerWithMemos;