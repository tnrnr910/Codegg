import { query, collection, where, getDocs } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { db } from "../../axios/firebase"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import MyPageMenuBar from "../../Components/MyPageMenuBar"

interface Post {
  id: string
  title: string
  content: string
  category: string
  date: string
  likes: number
  comments: number
}

interface TabOption {
  value: string
  label: string
}

const FollowPage: React.FC = () => {
  const auth = getAuth()
  const [activeTab, setActiveTab] = useState("questions")
  const [userId, setUserId] = useState<string | null>("")
  const [posts, setPosts] = useState<Post[]>([])
  const activeMenuItem = "/FollowPage"

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        console.log(user.email)
        setUserId(user.email)
        void GetPostData(activeTab)
      }
    })
  }, [])

  const GetPostData = async (postBoard: string) => {
    setPosts([])
    console.log(postBoard)
    const dbPosts = query(
      collection(db, "posts"),
      where("postUserEmail", "==", userId),
      where("postBoard", "==", postBoard)
    )
    const userSnapshot = await getDocs(dbPosts)

    userSnapshot.forEach((doc: any) => {
      if (doc != null) {
        console.log(doc.data())
        const newPost: Post = {
          id: doc.id,
          category: doc.data().postCategory,
          title: doc.data().postTitle,
          date: String(doc.data().postTime.toDate()),
          content: doc.data().postContent,
          likes: 0,
          comments: 0
        }
        setPosts([...posts, newPost])
      }
      console.log(posts)
    })
  }

  // 탭탭탭
  const tabOptions: TabOption[] = [
    { value: "Follow", label: "팔로우" },
    { value: "Followers", label: "팔로워" }
  ]

  return (
    <MyPostWrap>
      <MyPageMenuBar activeMenuItem={activeMenuItem} />
      <StyledContainer>
        <StyledTitle>팔로우/팔로워</StyledTitle>

        <StyledTabButtons>
          {tabOptions.map((tab) => (
            <StyledButton
              key={tab.value}
              className={activeTab === tab.value ? "active" : ""}
              onClick={() => {
                setActiveTab(tab.value)
                void GetPostData(tab.value)
              }}
            >
              {tab.label}
            </StyledButton>
          ))}
        </StyledTabButtons>
      </StyledContainer>
    </MyPostWrap>
  )
}
const MyPostWrap = styled.div`
  display: flex;
  margin-top: 6.875rem;
  justify-content: center;
`
const StyledContainer = styled.div`
  padding: 1.25rem;
  width: 66rem;
`

const StyledTitle = styled.div`
  margin-bottom: 3.125rem;
  font-size: 1.5625rem;
  font-weight: bold;
`

const StyledTabButtons = styled.div`
  background-color: #f4f4f4;
  height: 3.125rem;
  display: flex;
  border: 0.0625rem solid #dadada;
  margin-bottom: 1.25rem;
  border-radius: 0.625rem 0.625rem 0 0;
`

const StyledButton = styled.button`
  border-radius: ${(props) =>
    props.children === "질의응답" ? "0.5625rem 0 0 0" : ""};
  background-color: ${(props) =>
    props.className === "active" ? "#fff" : "transparent"};
  border-style: solid;
  border-color: #dadada;
  border-width: 0 0.0625rem 0 0;
  padding: 0.625rem 1.25rem;
  height: ${(props) => (props.className === "active" ? "3.1875rem" : "")};
  cursor: pointer;
  color: #333;
  font-weight: ${(props) => (props.className === "active" ? "bold" : "normal")};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.className === "active" ? "#f0f0f0" : "#e0e0e0"};
  }
`

export default FollowPage
