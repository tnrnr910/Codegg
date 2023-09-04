import {
  collection,
  getDocs,
  query,
  where,
  type DocumentSnapshot,
  type Timestamp,
  orderBy,
  startAt,
  endAt
} from "firebase/firestore"
import { db } from "./firebase"

interface Post {
  id: string
  postBoard: string
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

const getBoardPosts: any = async (
  board: string,
  limit: number
): Promise<Post[]> => {
  const q = query(collection(db, "posts"), where("postBoard", "==", board))
  const querySnapshot = await getDocs(q)

  const posts: Post[] = []
  let count = 0
  try {
    querySnapshot.forEach((doc: DocumentSnapshot) => {
      const data = {
        id: doc.id,
        ...doc.data()
      }
      posts.push(data as Post) // 형 변환을 통해 타입 일치화
      count++
      if (count === limit) {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw limit
      }
    })
  } catch {}

  return posts
}

const getPostData: any = async (
  postBoard: string,
  userId: string
): Promise<Post[]> => {
  const posts: Post[] = []
  const dbPosts = query(
    collection(db, "posts"),
    where("postUserEmail", "==", userId),
    where("postBoard", "==", postBoard)
  )
  const userSnapshot = await getDocs(dbPosts)
  userSnapshot.forEach((doc: DocumentSnapshot) => {
    if (doc != null) {
      const newPost = {
        id: doc.id,
        ...doc.data()
      }
      posts.push(newPost as Post)
    }
  })

  return posts
}

const getSearchedData = async (searchKeyword: string): Promise<Post[]> => {
  const searchResults: Post[] = []

  const q = query(
    collection(db, "posts"),
    orderBy("postTitle"),
    startAt(searchKeyword),
    endAt(searchKeyword + "\uf8ff")
  )

  const q1 = query(
    collection(db, "posts"),
    orderBy("postContent"),
    startAt(searchKeyword),
    endAt(searchKeyword + "\uf8ff")
  )

  try {
    const querySnapshot = await getDocs(q)
    const querySnapshot2 = await getDocs(q1)
    querySnapshot.forEach((doc: DocumentSnapshot) => {
      if (doc != null) {
        const newData = {
          id: doc.id,
          ...doc.data()
        }
        searchResults.push(newData as Post)
      }
    })
    querySnapshot2.forEach((doc: DocumentSnapshot) => {
      if (doc != null) {
        const newData = {
          id: doc.id,
          ...doc.data()
        }
        searchResults.push(newData as Post)
      }
    })
  } catch (error) {
    console.error("에러 발생: ", error)
  }
  return searchResults
}

export { getPosts, getComments, getBoardPosts, getPostData, getSearchedData }
