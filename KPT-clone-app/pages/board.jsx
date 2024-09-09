import React from "react";
import styled from "styled-components";

const colors = [
    "pink", "lightblue", "lightyellow", "lavender"
];

const title = [
    
]

const Container = styled.div`
    width: 500px;
    height: 350px;
    background-color: ${(props) => props.backgroundColor};
`;

const Row = styled.div`
  padding: 15px;
  display: flex; /* Flexbox를 사용하여 자식 요소들을 가로로 배치 */
  gap: 30px;
`;

function Board(props) {
    return (
        <div>
            <Row>
                <Container backgroundColor={colors[0]} />
                <Container backgroundColor={colors[1]} />
            </Row>
            <Row>
                <Container backgroundColor={colors[2]} />
                <Container backgroundColor={colors[3]} />
            </Row>
        </div>
    );
}

export default Board;