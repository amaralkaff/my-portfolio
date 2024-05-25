// src/utils/firestoreUtils.js
import {
  getFirestore,
  collection,
  query,
  orderBy,
  getDocs,
  addDoc,
} from "firebase/firestore";

const db = getFirestore();

export const getPosts = async () => {
  const postsCollection = collection(db, "posts");
  const postsQuery = query(postsCollection, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(postsQuery);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addPost = async (post) => {
  const postsCollection = collection(db, "posts");
  await addDoc(postsCollection, post);
};
