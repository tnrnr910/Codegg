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
  postSkin: string
  postColor: string
  postFontsize: string
  likes: number
  comments: number
}
interface comment {
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

interface usersInfo {
  id: string
  badgeImg: string
  displayName: string
  email: string
  isAdmin: boolean
  profileImg: string
  follower: number
  following: number
  currentPoint: number
  totalPoint: number
}

interface follow {
  id: string
  followuserEmail: string
  userEmail: string
}

interface item {
  type: string
  value: string
}

interface myItemList {
  postTitleBold: string
  postTitleColor: string
  postTitleFont: string
  postTitleSize: string
}

interface levelAndBadge {
  id: string
  badgeImg: string
  userLevel: string
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
  return posts
}

const getPostsOfBoard = async (board: string): Promise<Post[]> => {
  const q = query(
    collection(db, "posts"),
    where("postBoard", "==", board),
    orderBy("postTime", "desc")
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

const getComments = async (): Promise<comment[]> => {
  const q = query(collection(db, "comments"))
  const querySnapshot = await getDocs(q)
  const comments: comment[] = []
  querySnapshot.forEach((doc: DocumentSnapshot) => {
    const data = {
      id: doc.id,
      ...doc.data()
    }
    comments.push(data as comment) // 형 변환을 통해 타입 일치화
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

const getSearchedDataTTTT = async (searchKeyword: string): Promise<Post[]> => {
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

const getSearchedData = async (searchKeyword: string): Promise<Post[]> => {
  const searchResults: Post[] = []
  const keyword = searchKeyword.split(" ")
  const dbPosts = query(collection(db, "posts"), orderBy("postTime", "desc"))
  const userSnapshot = await getDocs(dbPosts)
  userSnapshot.forEach((doc: any) => {
    if (doc.data().postContent.includes(keyword) === true) {
      const newPost: Post = {
        id: doc.id,
        ...doc.data()
      }
      // setPosts([...posts, newPost])

      searchResults.push(newPost)
    } else if (doc.data().postTitle.includes(keyword) === true) {
      const newPost: Post = {
        id: doc.id,
        ...doc.data()
      }

      searchResults.push(newPost)
    }
  })
  return searchResults
}

const getUsersInfos = async (): Promise<usersInfo[]> => {
  const docRef = query(collection(db, "usersInfo"))
  const docSnap = await getDocs(docRef)

  const usersInfo: usersInfo[] = []

  docSnap.forEach((doc: DocumentSnapshot) => {
    const data = {
      id: doc.id,
      ...doc.data()
    }
    usersInfo.push(data as usersInfo) // 형 변환을 통해 타입 일치화
  })

  return usersInfo
}

const getUsersInfo = async (email: string): Promise<usersInfo[]> => {
  const usersInfoQuery = query(
    collection(db, "usersInfo"),
    where("email", "==", email)
  )
  const usersInfoQuerySnapshot = await getDocs(usersInfoQuery)
  const usersInfos: usersInfo[] = []

  usersInfoQuerySnapshot.forEach((doc: DocumentSnapshot) => {
    const data = {
      id: doc.id,
      ...doc.data()
    }
    usersInfos.push(data as usersInfo)
  })
  return usersInfos
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

const addfollow = async (followUserEmail: string, userEmail: string) => {
  try {
    await addDoc(collection(db, "follow"), {
      followUserEmail,
      userEmail
    })
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

    return followData
  } else {
    console.error("사용자를 찾을 수 없습니다.")
    return []
  }
}

const getfollowerInfo = async (email: string): Promise<usersInfo[]> => {
  const usersInfos: usersInfo[] = []
  const usersInfoQuery = query(
    collection(db, "usersInfo"),
    where("email", "==", email)
  )
  const usersInfoQuerySnapshot = await getDocs(usersInfoQuery)

  usersInfoQuerySnapshot.forEach((doc: DocumentSnapshot) => {
    if (doc != null) {
      const data = {
        id: doc.id,
        ...doc.data()
      }
      usersInfos.push(data as usersInfo)
    }
    console.log(usersInfos)
  })
  return usersInfos
}

const getfollowerData: any = async (followUserEmail: string) => {
  const q = query(
    collection(db, "follow"),
    where("followUserEmail", "==", followUserEmail)
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

    return followData
  } else {
    console.error("사용자를 찾을 수 없습니다.")
    return []
  }
}

const findfollowNumber: any = async (userEmail: string) => {
  const userInfo = query(
    collection(db, "usersInfo"),
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
  const querySnapshotuserInfo = await getDocs(userInfo)

  const follwerNum = querySnapshotfollower.size
  const followingNum = querySnapshotfollowing.size

  const firstDocument = querySnapshotuserInfo.docs[0]

  await updateDoc(doc(collection(db, "usersInfo"), firstDocument.id), {
    follower: follwerNum
  })

  await updateDoc(doc(collection(db, "usersInfo"), firstDocument.id), {
    following: followingNum
  })
}

const getPoint = async (userEmail: string | null) => {
  if (userEmail == null) {
    return 0
  }
  const q = query(collection(db, "usersInfo"), where("email", "==", userEmail))

  const querySnapshot = await getDocs(q)

  let data = 0
  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc) => {
      data = doc.data().currentPoint
    })
    return data
  } else {
    return 0
  }
}

const updatePoint = async (userEmail: string | null, currentPoint: number) => {
  if (userEmail == null) {
    return 0
  }
  const q = query(collection(db, "usersInfo"), where("email", "==", userEmail))

  const querySnapshot = await getDocs(q)

  let docId = ""
  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc) => {
      docId = doc.id
    })
    await updateDoc(doc(collection(db, "usersInfo"), docId), {
      currentPoint
    })
  } else {
    return 0
  }
}

const updateUserItems = async (userEmail: string | null, items: item[]) => {
  if (userEmail == null) {
    return 0
  }
  const userItemsRef = doc(db, "useritems", userEmail)
  const userItemsSnap = await getDoc(userItemsRef)

  if (userItemsSnap.exists()) {
    return await Promise.all(
      items.map(async (item: item) => {
        if (item.type === "postTitleBold") {
          await updateDoc(userItemsRef, {
            postTitleBold: item.value
          })
        } else if (item.type === "postTitleColor") {
          await updateDoc(userItemsRef, {
            postTitleColor: item.value
          })
        } else if (item.type === "postTitleFont") {
          await updateDoc(userItemsRef, {
            postTitleFont: item.value
          })
        } else if (item.type === "postTitleSize") {
          await updateDoc(userItemsRef, {
            postTitleSize: item.value
          })
        }
      })
    )
  } else {
    return 0
  }
}

const getUserItems = async (userEmail: string | null) => {
  const myItem: myItemList = {
    postTitleBold: "",
    postTitleColor: "",
    postTitleFont: "",
    postTitleSize: ""
  }
  if (userEmail == null) {
    return myItem
  }
  const userItemsRef = doc(db, "useritems", userEmail)
  const userItemsSnap = await getDoc(userItemsRef)

  if (userItemsSnap.exists()) {
    return userItemsSnap.data() as myItemList
  }

  return myItem
}

const getUserLevelAndBadge = async (): Promise<levelAndBadge[]> => {
  const docRef = query(collection(db, "userLevelAndBadge"))
  const docSnap = await getDocs(docRef)

  const userLevelAndBadge: levelAndBadge[] = []

  docSnap.forEach((doc: DocumentSnapshot) => {
    const data = {
      id: doc.id,
      ...doc.data()
    }
    userLevelAndBadge.push(data as levelAndBadge) // 형 변환을 통해 타입 일치화
  })

  return userLevelAndBadge
}

const applyPostItems = async (userEmail: string | null, items: item[]) => {
  if (userEmail == null) {
    return 0
  }
  const userPostRef = query(
    collection(db, "posts"),
    where("postUserEmail", "==", userEmail)
  )
  const userPostsSnap = await getDocs(userPostRef)

  let docId = ""

  if (!userPostsSnap.empty) {
    void Promise.all(
      items.map(async (item: item) => {
        if (item.type === "postTitleBold") {
          userPostsSnap.forEach(async (post) => {
            docId = post.id
            await updateDoc(doc(collection(db, "posts"), docId), {
              postSkin: item.value
            })
          })
        } else if (item.type === "postTitleColor") {
          userPostsSnap.forEach(async (post) => {
            docId = post.id
            await updateDoc(doc(collection(db, "posts"), docId), {
              postColor: item.value
            })
          })
        } else if (item.type === "postTitleFont") {
          userPostsSnap.forEach(async (post) => {
            docId = post.id
            await updateDoc(doc(collection(db, "posts"), docId), {
              postFont: item.value
            })
          })
        } else if (item.type === "postTitleSize") {
          userPostsSnap.forEach(async (post) => {
            docId = post.id
            await updateDoc(doc(collection(db, "posts"), docId), {
              postFontSize: item.value
            })
          })
        }
      })
    )
  } else {
    return 0
  }
}

export {
  getPost,
  getPosts,
  getPostsOfBoard,
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
  getUsersInfo,
  getUsersInfos,
  formatDate,
  setfollow,
  getfollow,
  findfollow,
  getfollowData,
  getfollowerInfo,
  getfollowerData,
  findfollowNumber,
  getPoint,
  updatePoint,
  updateUserItems,
  getUserItems,
  getSearchedDataTTTT,
  getUserLevelAndBadge,
  applyPostItems
}
export type { usersInfo }
