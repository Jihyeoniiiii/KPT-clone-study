import React, { useState, useEffect } from "react";
import MemoList from "../pages/memo-list.jsx";
import { auth, firestore } from '../src/firebaseConfig.js';
import styled from "styled-components";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const Container = styled.div`
  width: 700px;
  height: 400px;
  background-color: ${(props) => props.$backgroundColor};
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  margin: 0;
  padding: 10px;
  text-align: left;
`;

const LastTitle = styled.h3`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ContainerWithMemos = ({ backgroundColor, title, lastTitle }) => {
  const [memos, setMemos] = useState([]);
  const [drag, setDrag] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email.split('@')[0]);
        setUserId(user.uid);
      } else {
        setUserEmail('');
        setUserId('');
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userId && title) {
      const fetchMemos = async () => {
        try {
          const memosCollection = collection(firestore, `users/${userId}/${title}`);
          const memoSnapshot = await getDocs(memosCollection);
          const fetchedMemos = memoSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          console.log("Fetched memos:", fetchedMemos);
          setMemos(fetchedMemos);
        } catch (error) {
          console.error("Error fetching memos: ", error);
        }
      };
  
      fetchMemos();
    }
  }, [userId, title]);

  async function saveMemoToDB(memo) {
    try {
      const memosCollection = collection(firestore, `users/${userId}/${title}`);
      const docRef = await addDoc(memosCollection, memo);
      return docRef.id;
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  async function updateMemoInDB(id, updatedMemo) {
    try {
      const memoDoc = doc(firestore, `users/${userId}/${title}/${id}`);
      await updateDoc(memoDoc, updatedMemo);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  }

  async function deleteMemoFromDB(id) {
    try {
      const memoDoc = doc(firestore, `users/${userId}/${title}/${id}`);
      await deleteDoc(memoDoc);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  }

  function handleAttach(e) {
    e.preventDefault();
    if (drag !== null) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - 60;
    const y = e.clientY - rect.top - 75;

    const isOverlap = memos.some((memo) => {
      const memoRect = {
        left: memo.x - 60,
        top: memo.y - 75,
        right: memo.x + 60,
        bottom: memo.y + 75,
      };
      return (
        x >= memoRect.left &&
        x <= memoRect.right &&
        y >= memoRect.top &&
        y <= memoRect.bottom
      );
    });

    if (!isOverlap) {
      const newMemo = { text: "", x, y, color: getRandomColor() };
      saveMemoToDB(newMemo).then(id => {
        setMemos(prevMemos => [...prevMemos, { ...newMemo, id }]);
      });
    }
  }

  function handleMouseDown(index) {
    return (e) => {
      e.preventDefault();
      setDrag(index);
      const rect = e.currentTarget.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left - 60,
        y: e.clientY - rect.top - 75,
      });
    };
  }

  function handleMouseMove(e) {
    e.preventDefault();
    if (drag !== null) {
      const rect = e.currentTarget.getBoundingClientRect();
      const newX = e.clientX - rect.left - 60 - dragOffset.x;
      const newY = e.clientY - rect.top - 75 - dragOffset.y;

      const updatedMemos = memos.map((memo, index) =>
        index === drag ? { ...memo, x: newX, y: newY } : memo
      );
      setMemos(updatedMemos);
      updateMemoInDB(memos[drag].id, { x: newX, y: newY });
    }
  }

  function handleMouseUp() {
    setDrag(null);
  }

  function handleChange(index, text) {
    const updatedMemos = memos.map((memo, i) =>
        i === index ? { ...memo, text } : memo
    );
    setMemos(updatedMemos);
    updateMemoInDB(memos[index].id, { text });
}

function handleSave(index, text) {
  handleChange(index, text); // Call handleChange to update and save
}

  function handleRightClick(index) {
    const memoId = memos[index].id;
    deleteMemoFromDB(memoId).then(() => {
      const updatedMemos = memos.filter((_, i) => i !== index);
      setMemos(updatedMemos);
    });
  }

  function getRandomColor() {
    const getRandomValue = () => Math.floor(Math.random() * 56) + 200;
    const r = getRandomValue();
    const g = getRandomValue();
    const b = getRandomValue();

    return `rgb(${r}, ${g}, ${b})`;
  }

  return (
    <Container
      $backgroundColor={backgroundColor}
      onMouseDown={handleAttach}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {lastTitle ? (
        <LastTitle>{lastTitle}</LastTitle>
      ) : (
        <Title>{title}</Title>
      )}

      <MemoList
        memos={memos}
        onChange={handleChange}
        onRightClick={handleRightClick}
        onMouseDown={handleMouseDown}
        userEmail={userEmail}
        onSave={handleSave}
      />
    </Container>
  );
}

export default ContainerWithMemos;
