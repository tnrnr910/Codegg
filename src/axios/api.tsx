import {
  collection,
  getDocs,
  query,
  where,
  type DocumentSnapshot,
  type Timestamp,
  orderBy,
  startAt,
  endAt,
  addDoc,
  doc,
  deleteDoc,
  limit,
  updateDoc,
  increment,
  getDoc
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
  likes: number
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

interface like {
  id: string
  postId: string
  count: number
}

const getPost: any = async (postId: string): Promise<Post[]> => {
  const docRef = doc(db, "posts", postId)
  const docSnap = await getDoc(docRef)

  const posts: Post[] = []

  if (docSnap.exists()) {
    const data = {
      id: docSnap.id,
      ...docSnap.data()
    }
    posts.push(data as Post) // 형 변환을 통해 타입 일치화
  }
  return posts
}

const getPosts = async (): Promise<Post[]> => {
  const q = query(collection(db, "posts"), orderBy("postTime", "desc"))
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

const getLikes = async (): Promise<like[]> => {
  const q = query(collection(db, "likes"))
  const querySnapshot = await getDocs(q)

  const likes: like[] = []

  querySnapshot.forEach((doc: DocumentSnapshot) => {
    const data = {
      id: doc.id,
      ...doc.data()
    }
    likes.push(data as like) // 형 변환을 통해 타입 일치화
  })

  return likes
}

// 좋아요 삭제 함수
const deleteLike = async (postId: string, likeDocId: string) => {
  await deleteDoc(doc(db, "likes", likeDocId))
  await updateDoc(doc(collection(db, "likes"), postId), {
    likes: increment(-1)
  })
}

// 좋아요 추가 함수
const addLike = async (userId: string, postId: string) => {
  addDoc(collection(db, "likes"), {
    userId,
    postId
  })
    .then(() => {
      console.error("좋아요")
    })
    .catch((e: any) => {
      console.error("글 작성에 실패했습니다.:", e)
    })

  await updateDoc(doc(collection(db, "likes"), postId), {
    likes: increment(1)
  })
}

// 좋아요 setting 함수
const setLikes: any = async (set: boolean, userId: string, postId: string) => {
  if (!set) {
    await addLike(userId, postId)
  } else {
    let docId = ""
    const q = query(
      collection(db, "likes"),
      where("userId", "==", userId),
      where("postId", "==", postId)
    )
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc: DocumentSnapshot) => {
      if (doc.id !== null) {
        docId = doc.id
      }
    })
    await deleteLike(postId, docId)
  }
}

const findLikes: any = async (userId: string, postId: string) => {
  const q = query(
    collection(db, "likes"),
    where("userId", "==", userId),
    where("postId", "==", postId)
  )
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc: DocumentSnapshot) => {
    if (doc.id !== null) {
      return "exist"
    }
  })
  return "none"
}

// const getBoardPosts: any = async (
//   board: string,
//   limit: number
// ): Promise<Post[]> => {
//   const q = query(collection(db, "posts"), where("postBoard", "==", board))
//   const querySnapshot = await getDocs(q)

//   const posts: Post[] = []
//   let count = 0
//   try {
//     querySnapshot.forEach((doc: DocumentSnapshot) => {
//       const data = {
//         id: doc.id,
//         ...doc.data()
//       }
//       posts.push(data as Post) // 형 변환을 통해 타입 일치화
//       count++
//       if (count === limit) {
//         // eslint-disable-next-line @typescript-eslint/no-throw-literal
//         throw limit // 에러 throw
//       }
//     })
//   } catch {}

//   return posts
// }

const getBoardPosts: any = async (
  board: string,
  limitNum: number
): Promise<Post[]> => {
  const q = query(
    collection(db, "posts"),
    where("postBoard", "==", board),
    orderBy("postTime", "desc"),
    limit(limitNum)
  )
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
  const posts: Post[] = []

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
      console.log("독.데이타", doc.data())
      if (doc != null) {
        const newData = {
          id: doc.id,
          ...doc.data()
        }
        posts.push(newData as Post)
      }
    })
    querySnapshot2.forEach((doc: DocumentSnapshot) => {
      console.log("독.데이타22", doc.data())
      if (doc != null) {
        const newData = {
          id: doc.id,
          ...doc.data()
        }
        posts.push(newData as Post)
      }
    })
  } catch (error) {
    console.error("에러 발생: ", error)
  }
  return posts
}

export {
  getPost,
  getPosts,
  getComments,
  getBoardPosts,
  getPostData,
  getSearchedData,
  getLikes,
  setLikes,
  findLikes
}
