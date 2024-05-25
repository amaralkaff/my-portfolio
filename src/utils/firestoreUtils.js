// src/utils/firestoreUtils.js
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  writeBatch,
  orderBy,
  addDoc,
  doc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

const db = getFirestore();

export const getPosts = async () => {
  const postsCollection = collection(db, "posts");
  const postsQuery = query(postsCollection, orderBy("createdAt", "desc"));
  const postSnapshot = await getDocs(postsQuery);
  return postSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addPost = async (post) => {
  const postsCollection = collection(db, "posts");
  const docRef = await addDoc(postsCollection, post);
  return { id: docRef.id, ...post };
};

export const deletePost = async (postId) => {
  const postDoc = doc(db, "posts", postId);
  await deleteDoc(postDoc);
};

export const updateUserPosts = async (userId, updatedData) => {
  const postsQuery = query(
    collection(db, "posts"),
    where("userId", "==", userId)
  );
  const postSnapshot = await getDocs(postsQuery);

  const batch = writeBatch(db);
  postSnapshot.forEach((doc) => {
    batch.update(doc.ref, updatedData);
  });

  await batch.commit();
};

export const subscribeToPosts = (callback) => {
  const postsCollection = collection(db, "posts");
  const postsQuery = query(postsCollection, orderBy("createdAt", "desc"));
  return onSnapshot(postsQuery, (snapshot) => {
    const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(posts);
  });
};
