import ContainerWithMemos from "./memo-container";
import styled from "styled-components";

const colors = ["pink", "lightblue", "lightyellow", "lavender"];

const Row = styled.div`
  padding: 15px;
  display: flex;
  gap: 30px;
`;

function Board() {
    return (
      <div>
        <Row>
          <ContainerWithMemos backgroundColor={colors[0]} />
          <ContainerWithMemos backgroundColor={colors[1]} />
        </Row>
        <Row>
          <ContainerWithMemos backgroundColor={colors[2]} />
          <ContainerWithMemos backgroundColor={colors[3]} />
        </Row>
      </div>
    );
  }

  export default Board;