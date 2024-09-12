import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 120px;
    height: 130px;
    background-color: ${(props) => props.$backgroundColor};
    display: flex;
    justify-content: center;
    align-items: center;
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
`;

function Memo({ backgroundColor }) {
    const [text, setText] = useState("");

    const handleChange = (event) => {
        setText(event.target.value);
    };

    return (
        <Container $backgroundColor={backgroundColor}>
            <TextArea
                value={text}
                onChange={handleChange}
                autoFocus
                placeholder="Type anything, @mention anyone"
            />
        </Container>
    );
}

export default Memo;
