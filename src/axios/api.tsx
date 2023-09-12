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
  comments: number
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
  follower: number
  following: number
}

interface follow {
  id: string
  followuserEmail: string
  userEmail: string
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
  return await Promise.all(
    postIds.map(async (postId: string) => {
      const postRef = doc(db, "posts", postId)
      const postSnap = await getDoc(postRef)
      const data = {
        id: postSnap.id,
        ...postSnap.data()
      }
      return data as Post
    })
  )
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

const getUserLikes = async (userId: string | null): Promise<like[]> => {
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

const getUserLikesPost = async (userId: string | null) => {
  const likes = await getUserLikes(userId)
  const postIds = likes.map((like) => like.postId)
  const posts = await getMyLikePosts(postIds)
  return posts
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

const getusersinfos: any = async (): Promise<usersinfo[]> => {
  const docRef = query(collection(db, "usersinfo"))
  const docSnap = await getDocs(docRef)

  const usersinfo: usersinfo[] = []

  docSnap.forEach((doc: DocumentSnapshot) => {
    const data = {
      id: doc.id,
      ...doc.data()
    }
    usersinfo.push(data as usersinfo) // 형 변환을 통해 타입 일치화
  })

  return usersinfo
}

const getusersinfo = async (email: string): Promise<usersinfo[]> => {
  const usersinfoQuery = query(
    collection(db, "usersinfo"),
    where("email", "==", email)
  )
  const usersinfoQuerySnapshot = await getDocs(usersinfoQuery)
  const usersinfoes: usersinfo[] = []

  usersinfoQuerySnapshot.forEach((doc: DocumentSnapshot) => {
    const data = {
      id: doc.id,
      ...doc.data()
    }
    usersinfoes.push(data as usersinfo)
  })
  return usersinfoes
}

// formatDate 함수는 Date 객체를 받아서 "YYYY.MM.DD" 형식의 문자열로 변환됨
function formatDate(date: {
  getFullYear: () => any
  getMonth: () => number
  getDate: () => any
}) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}.${month}.${day}`
}

const addfollow = async (followuserEmail: string, userEmail: string) => {
  try {
    await addDoc(collection(db, "follow"), {
      followuserEmail,
      userEmail
    })
    console.log("팔로우 등록 성공")
  } catch (error) {
    console.error("팔로우 등록 실패:", error)
    // 적절한 오류 처리 추가
  }
}

const deletefollow = async (followDOCId: string) => {
  await deleteDoc(doc(db, "follow", followDOCId))
}

const setfollow: any = async (
  set: boolean,
  followuserEmail: string,
  userEmail: string
) => {
  if (!set) {
    await addfollow(followuserEmail, userEmail)
  } else {
    let docId = ""
    const q = query(
      collection(db, "follow"),
      where("followuserEmail", "==", followuserEmail),
      where("userEmail", "==", userEmail)
    )
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc: DocumentSnapshot) => {
      if (doc.id !== null) {
        docId = doc.id
      }
    })
    await deletefollow(docId)
  }
}

const getfollow = async (): Promise<follow[]> => {
  const q = query(collection(db, "follow"))
  const querySnapshot = await getDocs(q)
  const follower: follow[] = []
  querySnapshot.forEach((doc: DocumentSnapshot) => {
    const data = {
      id: doc.id,
      ...doc.data()
    }
    follower.push(data as follow) // 형 변환을 통해 타입 일치화
  })
  return follower
}

const findfollow: any = async (followuserEmail: string, userEmail: string) => {
  const q = query(
    collection(db, "follow"),
    where("followuserEmail", "==", followuserEmail),
    where("userEmail", "==", userEmail)
  )

  const querySnapshot = await getDocs(q)

  console.log(querySnapshot.size)

  if (querySnapshot.size === 0) {
    return false
  } else {
    return true
  }
}

const getfollowData: any = async (userEmail: string) => {
  const q = query(collection(db, "follow"), where("userEmail", "==", userEmail))

  const querySnapshot = await getDocs(q)

  const followData: follow[] = []

  if (!querySnapshot.empty) {
    querySnapshot.forEach((followDoc) => {
      const data: follow = {
        id: followDoc.id,
        followuserEmail: "",
        userEmail: "",
        ...followDoc.data()
      }

      followData.push(data)
    })

    console.log(followData)
    return followData
  } else {
    console.log("사용자를 찾을 수 없습니다.")
    return []
  }
}

const getfollowerInfo = async (email: string): Promise<usersinfo[]> => {
  const usersinfoes: usersinfo[] = []
  const usersinfoQuery = query(
    collection(db, "usersinfo"),
    where("email", "==", email)
  )
  const usersinfoQuerySnapshot = await getDocs(usersinfoQuery)

  usersinfoQuerySnapshot.forEach((doc: DocumentSnapshot) => {
    if (doc != null) {
      const data = {
        id: doc.id,
        ...doc.data()
      }
      usersinfoes.push(data as usersinfo)
    }
  })
  console.log(usersinfoes)
  return usersinfoes
}

const getfollowerData: any = async (followuserEmail: string) => {
  const q = query(
    collection(db, "follow"),
    where("followuserEmail", "==", followuserEmail)
  )
  const querySnapshot = await getDocs(q)

  const followData: follow[] = []

  if (!querySnapshot.empty) {
    querySnapshot.forEach((followDoc) => {
      const data: follow = {
        id: followDoc.id,
        followuserEmail: "",
        userEmail: "",
        ...followDoc.data()
      }

      followData.push(data)
    })

    console.log(followData)
    return followData
  } else {
    console.log("사용자를 찾을 수 없습니다.")
    return []
  }
}

const findfollowNumber: any = async (userEmail: string) => {
  const userinfo = query(
    collection(db, "usersinfo"),
    where("email", "==", userEmail)
  )
  const follower = query(
    collection(db, "follow"),
    where("userEmail", "==", userEmail)
  )

  const following = query(
    collection(db, "follow"),
    where("followuserEmail", "==", userEmail)
  )

  const querySnapshotfollower = await getDocs(follower)
  const querySnapshotfollowing = await getDocs(following)
  const querySnapshotuserinfo = await getDocs(userinfo)

  const follwerNum = querySnapshotfollower.size
  const followingNum = querySnapshotfollowing.size

  const firstDocument = querySnapshotuserinfo.docs[0]

  console.log(follwerNum)
  console.log(followingNum)

  await updateDoc(doc(collection(db, "usersinfo"), firstDocument.id), {
    follower: follwerNum
  })

  await updateDoc(doc(collection(db, "usersinfo"), firstDocument.id), {
    following: followingNum
  })
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
  getUserLikesPost,
  getusersinfo,
  getusersinfos,
  formatDate,
  setfollow,
  getfollow,
  findfollow,
  getfollowData,
  getfollowerInfo,
  getfollowerData,
  findfollowNumber
}
