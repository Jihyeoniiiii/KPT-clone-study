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

function Memo({ backgroundColor, email }) {
    const [text, setText] = useState("");
    const textAreaRef = useRef(null);

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleClick = () => {
        if(textAreaRef.current) {
            textAreaRef.current.focus();
        }
    };

    return (
        <Container $backgroundColor={backgroundColor} onClick={handleClick}>
            <TextArea
                ref={textAreaRef}
                value={text}
                onChange={handleChange}
                placeholder="Type anything, @mention anyone"
            />
            <IdArea>{email}</IdArea>
        </Container>
    );
}

export default Memo;
