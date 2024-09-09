import React, { useState } from "react";
import styled from "styled-components";
import Memo from "./memo";

const colors = [
    "pink", "lightblue", "lightyellow", "lavender"
];

const title = [
    
]

const Container = styled.div`
    width: 1600px;
    height: 400px;
    background-color: ${(props) => props.backgroundColor};
    position: relative;
`;

const Row = styled.div`
  padding: 15px;
  display: flex; /* Flexbox를 사용하여 자식 요소들을 가로로 배치 */
  gap: 30px;
`;

const MemoContainer = styled.div`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  cursor: grab;
`;

function Board() {
    const [ text, setText ] = useState("");
    const [ display, setDisplay ] = useState(false);
    const [ position, setPosition ] = useState({ x:0, y:0 });
    const [ memos, setMemos ] = useState([]);
    const [ drag , setDrag ] = useState(null);
    const [ dragOffset, setDragOffset ] = useState({ x:0, y:0 });

    function handleAttach(e) {
        if( drag != null ) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left-60;
        const y = e.clientY - rect.top-75;

        const isOverlap = memos.some(memo => {
            const memoRect = {
                left: memo.x - 60,
                top: memo.y - 75,
                right: memo.x + 60,
                bottom: memo.y + 75,
            };
            return (
                x >= memoRect.left && x <= memoRect.right &&
                y >= memoRect.top && y <= memoRect.bottom
            );
        });

        if(!isOverlap) {
            setDisplay(true); 

            setMemos([
                ...memos,
                { text: "", x, y, color: getRandomColor() }
            ]);
        }
    }

    function handleMouseDown(index,e){
        e.preventDefault();
        setDrag(index);
        const rect = e.currentTarget.getBoundingClientRect();
        setDragOffset({
            x: e.clientX - rect.left-60,
            y: e.clientY - rect.top-75,
        });
    }

    function handleMouseMove(e) {
        if(drag !== null){
            const rect = e.currentTarget.getBoundingClientRect();
            const newX = e.clientX - rect.left-60 - dragOffset.x;
            const newY = e.clientY - rect.top-75 - dragOffset.y;

            setMemos(memos.map((memo, index)=>
                index === drag ? { ...memo, x:newX, y:newY } : memo
            ));
        }
    }

    function handleMouseUp() {
        setDrag(null);
    }

    function handleChange(index, event) {
        const newMemos = [...memos];
        newMemos[index].text = event.target.value;
        setMemos(newMemos);
    }

    function getRandomColor() {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }

    return (
        <div
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseleave={handleMouseUp}
        >
            <Row>
                <Container backgroundColor={colors[0]} onMouseDown={handleAttach}>
                    {display && (
                        memos.map((memo, index)=>(
                            <MemoContainer 
                                key={index} 
                                top={memo.y} 
                                left={memo.x}
                                onMouseDown={(e) => handleMouseDown(index,e)}
                            >
                                <Memo 
                                    value={memo.text} 
                                    onChange={(e)=> handleChange(index, e)}
                                    backgroundColor={memo.color}
                                />
                            </MemoContainer>
                        ))
                    )}
                 </Container>
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