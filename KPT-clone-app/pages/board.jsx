import ContainerWithMemos from "../pages/memo-container.jsx";
import styled from "styled-components";

const colors = ["pink", "lightblue", "lightyellow", "lavender"];
const titles = [
    "Keep: 잘하고 있는점, 계속 했으면 좋겠다 싶은 점",
    "Try: 잘하고 있는 점은 더 잘하기 위해서, 문제 있는 점 해결하기",
    "Problem: 문제가 있는 점, 변화가 필요한 점",
]

const Row = styled.div`
  padding: 15px;
  display: flex;
  gap: 30px;
`;

function Board() {
    return (
      <div>
        <Row>
          <ContainerWithMemos backgroundColor={colors[0]} title={titles[0]} />
          <ContainerWithMemos backgroundColor={colors[1]} title={titles[1]} />
        </Row>
        <Row>
          <ContainerWithMemos backgroundColor={colors[2]} title={titles[2]} />
          <ContainerWithMemos backgroundColor={colors[3]} lastTitle={"오늘의 기분"} />
        </Row>
      </div>
    );
  }

  export default Board;