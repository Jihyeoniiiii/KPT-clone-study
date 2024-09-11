import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 120px;
    height: 150px;
    background-color: ${(props) => props.$backgroundColor};
    display: flex;
    justify-content: center;
    align-items: center; // 텍스트를 중앙에 배치
    overflow: hidden; // 텍스트 영역의 넘침 방지
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 100%;
    border: none;
    background: transparent;
    text-align: left;
    padding: 10px;
    outline: none;
    resize: none;
    box-sizing: border-box; // 패딩과 테두리를 포함한 전체 크기 조정
`;

function Memo({ value, onChange, backgroundColor }) {
    const [isEditing, setIsEditing] = useState(false);

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    return (
        <Container $backgroundColor={backgroundColor} onDoubleClick={handleDoubleClick}>
            <TextArea
                value={value}
                onChange={(event) => onChange(event.target.value)}
                onBlur={handleBlur}
                autoFocus={isEditing}
                readOnly={!isEditing}
                placeholder={!isEditing ? "Type anything, @mention anyone" : ""}
            />
        </Container>
    );
}

export default Memo;
