import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 150px;
  height: 200px;
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  justify-content: center; //자식을 수평으로 중앙
`;

const TextArea = styled.textarea`
    width: 120px;
    height: 170px;
    border: none;
    background: transparent;
    text-align: left;
    padding-top: 15px;
    outline: none;
    resize: none;
`;

function getRandomColor() {
	return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function Memo(props){
    const [text, setText] = useState("");

    function handleChange(event) {
        setText(event.target.text);
    }

    return (
        <Container backgroundColor={getRandomColor}>
            <TextArea 
                value={text}
                onChange={handleChange}
                placeholder="Type anything, @mention anyone"
            />
        </Container>
    );
}

export default Memo;