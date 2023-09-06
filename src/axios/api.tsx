/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import {
  collection,
  getDocs,
  query,
  where,
  type DocumentSnapshot,
  orderBy,
  startAt,
  endAt,
  addDoc,
  doc,
  deleteDoc,
  limit,
  updateDoc,
  increment,
  getDoc,
  type Timestamp
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
  commentTime: string
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
  userId: string
}

interface usersinfo {
  id: string
  badgeImg: string
  displayName: string
  email: string
  isAdmin: boolean
  profileImg: string
}

const getPost = async (postId: string): Promise<Post> => {
  let data = {}
  const postRef = doc(db, "posts", postId)
  const postSnap = await getDoc(postRef)
  if (postSnap.exists()) {
    data = {
      id: postSnap.id,
      ...postSnap.data()
      // postBoard: postSnap.data().postBoard,
      // postCategory: postSnap.data().postCategory,
      // postContent: postSnap.data().postContent,
      // postDisplayName: postSnap.data().postDisplayName,
      // postImgUrl: postSnap.data().postImgUrl,
      // postTitle: postSnap.data().postTitle,
      // postTime: postSnap.data().postTime,
      // postUserEmail: postSnap.data().postUserEmail,
      // likes: 0
    }
  }
  console.log(data)
  return data as Post
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
  console.log(posts)
  return posts
}

const getMyLikePosts = async (postIds: string[]): Promise<Post[]> => {
  const posts: Post[] = []
  postIds.map(async (postId: string) => {
    const postRef = doc(db, "posts", postId)
    const postSnap = await getDoc(postRef)

    const data = {
      id: postSnap.id,
      ...postSnap.data()
    }
    posts.push(data as Post) // 형 변환을 통해 타입 일치화
  })

  console.log(posts)
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

const getUserLikes = async (
  userId: string | null | undefined
): Promise<like[]> => {
  const q = query(collection(db, "likes"), where("userId", "==", userId))
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
  await updateDoc(doc(collection(db, "posts"), postId), {
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
      console.error("좋아요 등록에 실패했습니다.:", e)
    })

  await updateDoc(doc(collection(db, "posts"), postId), {
    likes: increment(1)
  })
}

// 좋아요 setting 함수
const setLikes: any = async (set: boolean, userId: string, postId: string) => {
  console.log(set)
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
  console.log(userId, postId)
  const q = query(
    collection(db, "likes"),
    where("userId", "==", userId),
    where("postId", "==", postId)
  )
  const querySnapshot = await getDocs(q)
  console.log(querySnapshot.size)
  if (querySnapshot.size === 0) {
    return false
  } else {
    return true
  }
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
  const searchResults: Post[] = []

  const keywords = searchKeyword.split(" ")

  for (const keyword of keywords) {
    const q = query(
      collection(db, "posts"),
      orderBy("postTitle"),
      startAt(keyword),
      endAt(keyword + "\uf8ff")
    )

    const q1 = query(
      collection(db, "posts"),
      orderBy("postContent"),
      startAt(keyword),
      endAt(keyword + "\uf8ff")
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

          if (!searchResults.some((item) => item.id === newData.id)) {
            searchResults.push(newData as Post)
          }
        }
      })

      querySnapshot2.forEach((doc: DocumentSnapshot) => {
        if (doc != null) {
          const newData = {
            id: doc.id,
            ...doc.data()
          }

          if (!searchResults.some((item) => item.id === newData.id)) {
            searchResults.push(newData as Post)
          }
        }
      })
    } catch (error) {
      console.error("에러 발생: ", error)
    }
  }

  return searchResults
}

const getusersinfo: any = async (
  email: string
): Promise<usersinfo | undefined> => {
  try {
    const usersinfoQuery = query(
      collection(db, "usersinfo"),
      where("email", "==", email)
    )
    const usersinfoQuerySnapshot = await getDocs(usersinfoQuery)

    if (!usersinfoQuerySnapshot.empty) {
      const userInfoDoc = usersinfoQuerySnapshot.docs[0]
      const data: usersinfo = {
        id: userInfoDoc.id,
        badgeImg: "",
        displayName: "",
        email: "",
        isAdmin: false,
        profileImg: "",
        ...userInfoDoc.data()
      }

      console.log(data)
      return data
    } else {
      console.log("사용자를 찾을 수 없습니다.")
      return undefined
    }
  } catch (error) {
    console.error("사용자 데이터를 가져오는 중 오류 발생:", error)
    throw error
  }
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
  findLikes,
  getUserLikes,
  getMyLikePosts,
  getusersinfo
}
