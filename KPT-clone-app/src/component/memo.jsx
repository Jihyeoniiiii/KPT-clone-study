import React, { useState, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 120px;
    height: 130px;
    background-color: ${(props) => props.$backgroundColor};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
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
    box-sizing: border-box;
    font-size: 10px;
`;

const IdArea = styled.span`
    display: flex;
    text-align: start;
    font-size: 10px;
    color: gray;
    padding: 0px 0px 10px 10px;
`;

const SubmitButton = styled.button`
    width: 100%;
    height: 30px;
    border: none;
    background-color: #EEEEEE;
    color: gray;
    font-size: 12px;
    cursor: pointer;
    border-radius: 0px;
`;

function Memo({ backgroundColor, email, handleRightClick, index, onSave, value }) {
    const [text, setText] = useState(value || "");
    const textAreaRef = useRef(null);

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleClick = () => {
        if (textAreaRef.current) {
            textAreaRef.current.focus();
        }
    };

    const handleContextMenu = (e) => {
        e.preventDefault();
        handleRightClick(index);
    };

    const handleSubmit = () => {
        onSave(index, text);
    };

    return (
        <Container $backgroundColor={backgroundColor} onClick={handleClick}>
            <TextArea
                ref={textAreaRef}
                value={text}
                onChange={handleChange}
                onContextMenu={handleContextMenu}
                placeholder="Type anything, @mention anyone"
            />
            <IdArea>{email}</IdArea>
            <SubmitButton onClick={handleSubmit}>입력</SubmitButton>
        </Container>
    );
}

export default Memo;
