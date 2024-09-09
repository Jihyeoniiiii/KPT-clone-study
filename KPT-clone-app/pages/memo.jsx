import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 120px;
  height: 150px;
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
    padding: 10px;
    outline: none;
    resize: none;
`;

function Memo({ value, onChange, backgroundColor }){
    return (
        <Container backgroundColor={backgroundColor}>
            <TextArea 
                value={value}
                onChange={onChange}
                placeholder="Type anything, @mention anyone"
            />
        </Container>
    );
}

export default Memo;