import React from "react";
import Memo from "../component/memo.jsx";
import styled from "styled-components";

const MemoContainer = styled.div`
  position: absolute;
  top: ${(props) => props.$top}px;
  left: ${(props) => props.$left}px;
  cursor: grab;
  user-select: none;
`;

function MemoList({ memos, onChange, onMouseDown, userEmail }) {
  return (
    <>
      {memos.map((memo, index) => (
        <MemoContainer
          key={index}
          $top={memo.y}
          $left={memo.x}
          onMouseDown={onMouseDown(index)}
        >
          <Memo
            value={memo.text}
            onChange={(text) => onChange(index, text)}
            backgroundColor={memo.color}
            email={userEmail}
          />
        </MemoContainer>
      ))}
    </>
  );
}

export default MemoList;
