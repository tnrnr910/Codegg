import { collection, getDocs, query, type DocumentSnapshot, type Timestamp } from "firebase/firestore";
import { db } from "./firebase";

interface Post {
  id: string;
  postCategory: string;
  postContent: string;
  postDisplayName: string;
  postImgUrl: string;
  postTitle: string;
  postTime: Timestamp;
  postUserEmail: string;
}

const getPosts = async (): Promise<Post[]> => {
  const q = query(collection(db, "posts"));
  const querySnapshot = await getDocs(q);

  const posts: Post[] = [];
  
  querySnapshot.forEach((doc: DocumentSnapshot) => {
    const data = {
      id: doc.id,
      ...doc.data()
    };
    posts.push(data as Post); // 형 변환을 통해 타입 일치화
  });

  return posts;
};

export { getPosts };