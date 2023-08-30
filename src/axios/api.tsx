import {
  collection,
  getDocs,
  query,
  type DocumentSnapshot,
  type Timestamp
} from "firebase/firestore"
import { db } from "./firebase"

interface Post {
  id: string
  postCategory: string
  postContent: string
  postDisplayName: string
  postImgUrl: string
  postTitle: string
  postTime: Timestamp
  postUserEmail: string
}

interface Comment {
  id: string
  commentContent: string
  commentTime: Timestamp
  commentUserEmail: string
  commentUserdisplayName: string
  isSecret: boolean
  postId: string
  postUserEmail: string
  postUserdisplayName: string
}

const getPosts = async (): Promise<Post[]> => {
  const q = query(collection(db, "posts"))
  const querySnapshot = await getDocs(q)

  const posts: Post[] = []

  querySnapshot.forEach((doc: DocumentSnapshot) => {
    const data = {
      id: doc.id,
      ...doc.data()
    }
    posts.push(data as Post) // 형 변환을 통해 타입 일치화
  })

  return posts
}

const getComments = async (): Promise<Comment[]> => {
  const q = query(collection(db, "comments"))
  const querySnapshot = await getDocs(q)

  const comments: Comment[] = []

  querySnapshot.forEach((doc: DocumentSnapshot) => {
    const data = {
      id: doc.id,
      ...doc.data()
    }
    comments.push(data as Comment) // 형 변환을 통해 타입 일치화
  })

  return comments
}

export { getPosts, getComments }
