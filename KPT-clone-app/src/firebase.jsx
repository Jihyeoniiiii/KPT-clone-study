import { db, doc, setDoc } from "./firebaseConfig";

export const saveMemoToFirestore = async (email, containerTitle, index, text) => {
  try {
    const memoRef = doc(db, 'users', email, 'containers', containerTitle, 'memos', `memo_${index}`);
    await setDoc(memoRef, { text });
    console.log("Memo saved successfully!");
  } catch (error) {
    console.error("Error saving memo: ", error);
  }
};

export default saveMemoToFirestore;
