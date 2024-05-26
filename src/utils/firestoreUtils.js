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
  updateDoc,
  onSnapshot,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const db = getFirestore();
const storage = getStorage();

export const getPosts = async () => {
  const postsCollection = collection(db, "posts");
  const postsQuery = query(postsCollection, orderBy("createdAt", "desc"));
  const postSnapshot = await getDocs(postsQuery);
  return postSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addPost = async (post) => {
  const postsCollection = collection(db, "posts");
  const docRef = await addDoc(postsCollection, { ...post, likes: [] });
  return { id: docRef.id, ...post, likes: [] };
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

export const uploadImage = async (file) => {
  if (!file) return null;

  const storageRef = ref(storage, `images/${file.name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};

export const likePost = async (postId, userId, like) => {
  const postDoc = doc(db, "posts", postId);
  if (like) {
    await updateDoc(postDoc, {
      likes: arrayUnion(userId),
    });
  } else {
    await updateDoc(postDoc, {
      likes: arrayRemove(userId),
    });
  }
};
