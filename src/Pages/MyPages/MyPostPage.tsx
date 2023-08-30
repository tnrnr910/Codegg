import { query, collection, where, getDocs } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { db } from "../../axios/firebase"
import React, { useEffect, useState } from "react"
import styled from "styled-components"

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

const MyPostPage: React.FC = () => {
  const auth = getAuth()
  const [activeTab, setActiveTab] = useState("questions")
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [categorySelected, setCategorySelected] = useState("모든 카테고리")
  const [userId, setUserId] = useState<string | null>("")
  const [posts, setPosts] = useState<Post[]>([])

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
    { value: "questions", label: "질의응답" },
    { value: "tips", label: "코딩 팁" },
    { value: "meetups", label: "모임" },
    { value: "comments", label: "댓글" }
  ]

  const [searchTerm, setSearchTerm] = useState("")

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const filteredPosts = posts.filter((post) => {
    return (
      (post.category === activeTab || activeTab === "all") &&
      (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })

  function DropDown() {
    return (
      <StyledCategoryDropdown open={categoryOpen}>
        <StyledCategoryList>
          <StyledCategoryItem
            onClick={() => {
              setCategorySelected("JS")
              setCategoryOpen(false)
            }}
            selected={categorySelected === "JS"}
          >
            JS
          </StyledCategoryItem>
          <StyledCategoryItem
            onClick={() => {
              setCategorySelected("React")
              setCategoryOpen(false)
            }}
            selected={categorySelected === "React"}
          >
            React
          </StyledCategoryItem>
          <StyledCategoryItem
            onClick={() => {
              setCategorySelected("Node")
              setCategoryOpen(false)
            }}
            selected={categorySelected === "Node"}
          >
            Node
          </StyledCategoryItem>
          <StyledCategoryItem
            onClick={() => {
              setCategorySelected("Next")
              setCategoryOpen(false)
            }}
            selected={categorySelected === "Next"}
          >
            Next
          </StyledCategoryItem>
          <StyledCategoryItem
            onClick={() => {
              setCategorySelected("파이썬")
              setCategoryOpen(false) // 자동으로 닫히게 하는 로직
            }}
            selected={categorySelected === "파이썬"}
          >
            파이썬
          </StyledCategoryItem>
          {/* ... Add other categories ... */}
        </StyledCategoryList>
      </StyledCategoryDropdown>
    )
  }

  return (
    <StyledContainer>
      <StyledTitle>내가 쓴 글</StyledTitle>

      <StyledTabButtons>
        {tabOptions.map((tab) => (
          <StyledButton
            key={tab.value}
            className={activeTab === tab.value ? "active" : ""}
            onClick={() => {
              setActiveTab(tab.value)
              setCategoryOpen(false)
              setCategorySelected("")
              void GetPostData(tab.value)
            }}
          >
            {tab.label}
          </StyledButton>
        ))}
      </StyledTabButtons>
      <NumberAndSearchBox>
        <NumberBox>
          전체<StyledNumberBlue> {posts.length}</StyledNumberBlue>개
          &nbsp;&nbsp;&nbsp; 글<StyledNumberBlue> {1}</StyledNumberBlue>개
        </NumberBox>

        <SelectAndSearchBox>
          <SearchWord>검색 &nbsp;</SearchWord>
          <SelectPageBox>
            <SelectPages>
              <StyledSearchContainer>
                <StyledCategoryButton
                  onClick={() => {
                    setCategoryOpen(!categoryOpen)
                  }}
                >
                  {categorySelected} {categoryOpen ? "▲" : "▼"}
                </StyledCategoryButton>
                {categoryOpen && <DropDown />}
              </StyledSearchContainer>
            </SelectPages>
          </SelectPageBox>

          <StyledSearchInput
            type="text"
            placeholder="어떤게 궁금하신가요?"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
            }}
          />
        </SelectAndSearchBox>
      </NumberAndSearchBox>
      <StyledPostTitleBox>
        <StyledPostTitleCategory>카테고리</StyledPostTitleCategory>
        <StyledPostTitlePostName>글제목</StyledPostTitlePostName>
        <StyledPostTitlePostDay>작성일자 </StyledPostTitlePostDay>
        <StyledPostTitlePostLikes>좋아요 수 </StyledPostTitlePostLikes>
        <StyledPostTitlePostCommentNum>댓글 수 </StyledPostTitlePostCommentNum>
      </StyledPostTitleBox>
      <StyledPostContainer>
        {posts.length === 0 ? (
          <p>작성된 게시글이 없습니다.</p>
        ) : (
          <StyledPostList>
            {posts.map((post) => (
              <StyledPost key={post.id}>
                <StyledPostCategory>{post.category}</StyledPostCategory>
                <h3>{post.title}</h3>
                <p>작성 일자: {post.date}</p>
              </StyledPost>
            ))}
          </StyledPostList>
        )}
      </StyledPostContainer>
    </StyledContainer>
  )
}
const StyledContainer = styled.div`
  padding: 1.25rem;
  width: 62.5rem;
  margin: auto, 0;
`

const StyledTitle = styled.div`
  margin-top: 4.875rem;
  margin-bottom: 3.125rem;
  font-size: 1.5625rem;
  font-weight: bold;
`

const StyledSearchContainer = styled.span`
  display: inline;
  width: 8rem;
`

const StyledCategoryButton = styled.button`
  border: none;
  cursor: pointer;
  float: right;
  font-size: 0.875rem;
  background-color: white;
  width: auto;
`

const StyledCategoryDropdown = styled.div<{ open: boolean }>`
  position: absolute;
  top: ${({ open }) => (open ? "2.5rem" : "-12.5rem")};
  transition: top 0.3s ease;
  z-index: 1;
`

const StyledCategoryList = styled.ul`
  list-style: none;
  padding: 0;
  background-color: #fff;
  border: 0.0625rem solid #ccc;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
`

const StyledCategoryItem = styled.li<{ selected: boolean }>`
  padding: 0.1875rem 2.5rem;
  margin: 0rem 0.4rem 0rem 0.5rem;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#0C356A" : "0C356A")};
  color: ${(props) => (props.selected ? "#ffffff" : "#000000")};

  &:hover {
    background-color: ${(props) => (props.selected ? "#0C356A" : "#e0e0e0")};
  }
`

const StyledSearchInput = styled.input`
  padding: 0.625rem;
  width: 22.5rem;
  height: 1rem;
  background-color: var(--color-line-gray-200);
  float: right;
  border-radius: 0.3125rem;
  border: 0.0625rem solid #dadada;
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

const StyledPostContainer = styled.div`
  border: 0.0625rem solid #ccc;
  background-color: #f8f8f8;
  padding: 1.25rem;
  margin-bottom: 1.25rem;
`

const StyledPostList = styled.ul`
  list-style: none;
  padding: 0;
`

const StyledPost = styled.li`
  border: 0.0625rem solid #ccc;
  padding: 1.25rem;
  margin-bottom: 1.25rem;
  background-color: #f8f8f8;
`

const StyledPostCategory = styled.p`
  font-weight: bold;
  margin-bottom: 0.3125rem;
`

const StyledNumberBlue = styled.span`
  color: #0c356a;
  font-weight: bold;
`

const NumberAndSearchBox = styled.div`
  position: relative;
  height: 3.75rem;
  width: 100%;
`

const NumberBox = styled.span`
  position: absolute;
  margin-top: 0.8125rem;
  margin-left: 1.25rem;
`

const SelectAndSearchBox = styled.span`
  float: right;
  width: 39.375rem;
`

const SelectPageBox = styled.span`
  font-size: 0.875rem;
  margin-left: 5.2rem;
`

const SelectPages = styled.span`
  display: inline-block;
  border: 0.0625rem solid #dadada;
  padding: 0.625rem;
  width: 8rem;
  border-radius: 0.3125rem;
  font-size: 0.875rem;
  height: 1rem;
`

const StyledPostTitleBox = styled.div`
  width: 100%;
  text-align: right;
  height: 1.875rem;
  margin-top: 0.625rem;
  margin-bottom: 1.25rem;
  border-top: 0.0625rem solid #dadada;
  padding-top: 0.875rem;
  border-bottom: 0.0625rem solid #333333;
`

const StyledPostTitlePostName = styled.span`
  float: left;
  width: 31.25rem;
  text-align: center;
  font-size: 0.875rem;
`

const StyledPostTitlePostDay = styled.span`
  display: inline-block;
  width: 6.875rem;
  text-align: center;
  font-size: 0.875rem;
`

const StyledPostTitlePostLikes = styled.span`
  display: inline-block;
  width: 6.25rem;
  text-align: center;
  font-size: 0.875rem;
`

const StyledPostTitlePostCommentNum = styled.span`
  display: inline-block;
  width: 5.625rem;
  text-align: center;
  font-size: 0.875rem;
`

const StyledPostTitleCategory = styled.span`
  float: left;
  width: 5.625rem;
  text-align: center;
  font-size: 0.875rem;
`

const SearchWord = styled.span`
  position: absolute;
  margin-top: 12px;
  margin-left: 2.8rem;
  font-size: 0.875rem;
`

export default MyPostPage
