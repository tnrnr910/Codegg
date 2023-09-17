import {
  query,
  collection,
  where,
  getDocs,
  doc,
  getDoc
} from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { db } from "../../axios/firebase"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import MyPageMenuBar from "../../Components/MyPageMenuBar"
import { useNavigate } from "react-router"
import { BiSearch } from "react-icons/bi"
import { formatDate } from "../../Components/DateChange"

interface Post {
  id: string
  postBoard: string
  postCategory: string
  postContent: string
  postTitle: string
  postTime: number
  likes: number
  comments: number
}

interface TabOption {
  value: string
  label: string
}

const MyPostPage: React.FC = () => {
  const auth = getAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("questions")
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [categorySelected, setCategorySelected] = useState("카테고리")
  const [userId, setUserId] = useState<string | null>("")
  const [posts, setPosts] = useState<Post[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const activeMenuItem = "/MyPostPage"

  // 맨처음 페이지 렌더링시 작동하는 useEffect
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        setUserId(user.email)
        setCategorySelected("카테고리")
        const list = GetPostData(activeTab)
        const getData = () => {
          list.then((dummyData: any) => {
            setPosts(dummyData)
          })
        }
        getData()
      }
    })
  }, [userId])

  // 파이어베이스에서 내가 쓴 게시글을 가지고 오는 함수
  const GetPostData: any = async (postBoard: string) => {
    const postsTemp: Post[] = []
    const dbPosts = query(
      collection(db, "posts"),
      where("postUserEmail", "==", userId),
      where("postBoard", "==", postBoard)
    )
    const userSnapshot = await getDocs(dbPosts)
    userSnapshot.forEach((doc: any) => {
      if (doc != null) {
        const newPost: Post = {
          id: doc.id,
          postCategory: doc.data().postCategory,
          postTitle: doc.data().postTitle,
          postTime: doc.data().postTime,
          postContent: doc.data().postContent,
          postBoard: doc.data().postBoard,
          likes: doc.data().likes,
          comments: doc.data().comments
        }
        // setPosts([...posts, newPost])

        postsTemp.push(newPost)
      }
    })
    return postsTemp
  }

  // 파이어베이스에서 내가 쓴 게시글을 가지고 오는 함수
  const GetCommentData: any = async (userId: string) => {
    const postIds: string[] = []
    const dbComments = query(
      collection(db, "comments"),
      where("commentUserEmail", "==", userId)
    )
    const userSnapshotComments = await getDocs(dbComments)
    userSnapshotComments.forEach((doc: any) => {
      if (doc != null) {
        postIds.push(doc.data().postId)
      }
    })

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

  // 9월 1일자로 한거
  // 파이어베이스에서 내가 쓴 게시글에서 단어 검색 해서 찾아내는 함수
  const GetFindPostData: any = async (
    postCategory: string,
    postBoard: string,
    keyword: string
  ) => {
    const postsTemp: Post[] = []
    const dbPosts = query(
      collection(db, "posts"),
      where("postUserEmail", "==", userId),
      where("postBoard", "==", postBoard)
    )
    const userSnapshot = await getDocs(dbPosts)
    userSnapshot.forEach((doc: any) => {
      if (
        doc != null &&
        doc.data().postUserEmail === userId &&
        postBoard === doc.data().postBoard
      ) {
        if (doc.data().postContent.includes(keyword) === true) {
          const newPost: Post = {
            id: doc.id,
            postCategory: doc.data().postCategory,
            postTitle: doc.data().postTitle,
            postTime: doc.data().postTime,
            postContent: doc.data().postContent,
            postBoard: doc.data().postBoard,
            likes: doc.data().likes,
            comments: doc.data().comments
          }
          // setPosts([...posts, newPost])

          postsTemp.push(newPost)
        } else if (doc.data().postTitle.includes(keyword) === true) {
          const newPost: Post = {
            id: doc.id,
            postCategory: doc.data().postCategory,
            postTitle: doc.data().postTitle,
            postTime: doc.data().postTime,
            postContent: doc.data().postContent,
            postBoard: doc.data().postBoard,
            likes: doc.data().likes,
            comments: doc.data().comments
          }
          // setPosts([...posts, newPost])

          postsTemp.push(newPost)
        }
      }
    })
    if (postCategory !== "카테고리") {
      postsTemp.filter((post) => post.postCategory === postCategory)
    }
    return postsTemp
  }

  // 게시글을 클릭시 디테일페이지로 이동하도록하는 함수
  const GoToDetailPage: any = (id: string) => {
    navigate(`/DetailPage/${id}`)
  }

  // 돋보기 버튼 클릭시 작동하는 이벤트 함수
  const SearchIncludeWord: any = () => {
    GetFindPostData(categorySelected, activeTab, searchTerm).then(
      (dummyData: any) => {
        setPosts(dummyData)
      }
    )
    setSearchTerm("")
  }

  // 검색창에서 엔터를 누를시 작동하는 이벤트 함수
  const handleOnKeyPress = (e: any) => {
    if (e.key === "Enter") {
      GetFindPostData(categorySelected, activeTab, searchTerm).then(
        (dummyData: any) => {
          setPosts(dummyData)
        }
      )
      setSearchTerm("")
    }
  }

  // 탭탭탭
  const tabOptions: TabOption[] = [
    { value: "questions", label: "질의응답" },
    { value: "tips", label: "코딩 팁" },
    { value: "meetups", label: "모임" },
    { value: "comments", label: "댓글" }
  ]

  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const filteredPosts = posts.filter((post) => {
  //   return (
  //     (post.category === activeTab || activeTab === "all") &&
  //     (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       post.content.toLowerCase().includes(searchTerm.toLowerCase()))
  //   )
  // })

  function DropDown() {
    return (
      <StyledCategoryDropdown open={categoryOpen}>
        <StyledCategoryList>
          <StyledCategoryItem
            onClick={() => {
              setCategorySelected("카테고리")
              setCategoryOpen(false)
            }}
            selected={categorySelected === "카테고리"}
          >
            카테고리
          </StyledCategoryItem>
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
              setCategorySelected("Python")
              setCategoryOpen(false)
            }}
            selected={categorySelected === "Python"}
          >
            Python
          </StyledCategoryItem>
        </StyledCategoryList>
      </StyledCategoryDropdown>
    )
  }

  return (
    <MyPostWrap>
      <MyPageMenuBar activeMenuItem={activeMenuItem} />
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
                setSearchTerm("")
                setCategorySelected("카테고리")
                if (tab.value === "comments") {
                  GetCommentData(userId).then((dummyData: any) => {
                    setPosts(dummyData) // 내가 쓴 글 댓글
                  })
                } else {
                  GetPostData(tab.value).then((dummyData: any) => {
                    setPosts(dummyData)
                  })
                }
              }}
            >
              {tab.label}
            </StyledButton>
          ))}
        </StyledTabButtons>
        <NumberAndSearchBox>
          <NumberBox>
            전체
            <StyledNumberBlue>
              {" "}
              {activeTab === "comments"
                ? posts?.length
                : posts?.filter((post) => post.postBoard === activeTab)?.length}
            </StyledNumberBlue>
            개
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
            <SearchButton type="button" onClick={SearchIncludeWord} />
            <StyledSearchInput
              type="text"
              placeholder="어떤게 궁금하신가요?"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
              }}
              onKeyPress={handleOnKeyPress}
            />
          </SelectAndSearchBox>
        </NumberAndSearchBox>
        <StyledPostTitleBox>
          <StyledPostTitleCategory>카테고리</StyledPostTitleCategory>
          <StyledPostTitlePostName>글제목</StyledPostTitlePostName>
          <StyledPostTitlePostDay>작성일자 </StyledPostTitlePostDay>
          <StyledPostTitlePostLikes>좋아요 수 </StyledPostTitlePostLikes>
          <StyledPostTitlePostCommentNum>
            댓글 수{" "}
          </StyledPostTitlePostCommentNum>
        </StyledPostTitleBox>
        <StyledPostContainer>
          {posts.length === 0 ? (
            <p>작성된 게시글이 없습니다.</p>
          ) : (
            <StyledPostList>
              {categorySelected === "카테고리"
                ? posts.map((post) => (
                    <StyledPost
                      key={post.id}
                      onClick={() => {
                        GoToDetailPage(post.id)
                      }}
                    >
                      <StyledPostCategory>
                        {post.postCategory}
                      </StyledPostCategory>
                      <StyledPostTitle>{post.postTitle}</StyledPostTitle>
                      <TimeAndLikeAndCommentBox>
                        <p>{formatDate(post.postTime)}</p>
                        <StyledNumber>{post.likes}</StyledNumber>
                        <StyledNumber>{post.comments}</StyledNumber>
                      </TimeAndLikeAndCommentBox>
                    </StyledPost>
                  ))
                : posts
                    .filter(
                      (post) =>
                        categorySelected !== "카테고리" &&
                        post.postCategory === categorySelected
                      // (post) => {
                      //   categorySelected !== "카테고리" &&
                      //   post.category === categorySelected
                      // }
                      // return post
                    )
                    .map((post) => (
                      <StyledPost
                        key={post.id}
                        onClick={() => {
                          GoToDetailPage(post.id)
                        }}
                      >
                        <StyledPostCategory>
                          {post.postCategory}
                        </StyledPostCategory>
                        <StyledPostTitle>{post.postTitle}</StyledPostTitle>
                        <TimeAndLikeAndCommentBox>
                          <p>{formatDate(post.postTime)}</p>
                          <StyledNumber>{post.likes}</StyledNumber>
                          <StyledNumber>{post.comments}</StyledNumber>
                        </TimeAndLikeAndCommentBox>
                      </StyledPost>
                    ))}
            </StyledPostList>
          )}
        </StyledPostContainer>
      </StyledContainer>
    </MyPostWrap>
  )
}

const StyledPostTitle = styled.p`
  width: 500px;
  justify-content: left;
  padding-top: 3px;
`

const StyledNumber = styled.p`
  margin-right: 20px;
`

const TimeAndLikeAndCommentBox = styled.td`
  display: flex;
  justify-content: space-between;
  float: right;
  width: 255px;
  margin-right: 23px;
`

const MyPostWrap = styled.div`
  display: flex;
  margin-top: 2rem;
  justify-content: center;
  height: 780px;
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

const StyledSearchContainer = styled.span`
  display: inline;
  width: 8rem;
`

const StyledCategoryButton = styled.button`
  border: none;
  cursor: pointer;
  float: right;
  padding: 0px;
  padding-right: 10px;
  font-size: 0.875rem;
  background-color: white;
  width: auto;
`

const StyledCategoryDropdown = styled.div<{ open: boolean }>`
  position: absolute;
  top: ${({ open }) => (open ? "2.5rem" : "-12.5rem")};
  transition: top 0.3s ease;
  z-index: 1;
  width: 9%;
  text-align: center;
`

const StyledCategoryList = styled.ul`
  list-style: none;
  margin: 0; /* 수정 */
  padding: 0; /* 추가 */
  background-color: #ffffff;
  border: 1px solid #e7e7e7; /* 추가 */
`

const StyledCategoryItem = styled.li<{ selected: boolean }>`
  cursor: pointer;
  border: none;
  border-top: 1px solid #e7e7e7; /* 추가 */
  padding: 8px 12px; /* 수정 */
  background-color: ${(props) => (props.selected ? "#f0f0f0" : "transparent")};
  transition: background-color 0.3s ease; /* 추가 */
  &:first-child {
    border-top: none; /* 추가 */
  }
  &:hover {
    background-color: #f0f0f0; /* 추가 */
  }
`

const StyledSearchInput = styled.input`
  padding: 0.625rem;
  width: 20rem;
  height: 1rem;
  background-color: var(--color-line-gray-200);
  float: right;
  border-radius: 0.3125rem;
  border: 0.0625rem solid #dadada;
`

const SearchButton = styled(BiSearch)`
  margin: 5px;
  float: right;
  background: styled(BiSearch);
  width: 30px;
  height: 30px;
  border: 0 solid white;
  color: #63717f;
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
  font-size: 13px;
  border: 0px solid;
  background-color: white;
  margin-bottom: 1.25rem;
`

const StyledPostList = styled.table`
  list-style: none;
  padding: 0;
  background-color: white;
  border-color: white;
  width: 100%;
`

const StyledPost = styled.tr`
  display: flex;
  justify-content: space-between;
  border: 0.0625rem solid #ffffff;
  margin-bottom: 1.25rem;
  background-color: #ffffff;
  height: 20px;
  width: 100%;
  cursor: pointer;
`

const StyledPostCategory = styled.td`
  border: solid #e7e7e7 1px;
  padding: 3px 3px 3px 3px;
  color: #9f9f9f;
  display: flex;
  width: 45px;
  justify-content: center;
  margin-left: 16px;
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
  width: 37rem;
`

const SelectPageBox = styled.span`
  font-size: 0.875rem;
  margin-left: 5.2rem;
`

const SelectPages = styled.span`
  display: inline-block;
  border: 0.0625rem solid #dadada;
  padding: 0.625rem;
  width: 6rem;
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
  margin-left: 80px;
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
