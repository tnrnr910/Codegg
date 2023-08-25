import React, { useState } from "react"
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
  const [activeTab, setActiveTab] = useState("questions")
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [categorySelected, setCategorySelected] = useState("")

  const [posts] = useState<Post[]>([
    // ... your post data ...
  ])
  // 탭탭탭
  const tabOptions: TabOption[] = [
    { value: "questions", label: "질의응답" },
    { value: "tips", label: "코딩 팁" },
    { value: "meetups", label: "모임" },
    { value: "comments", label: "댓글" }
  ]

  const [searchTerm, setSearchTerm] = useState("")

  const filteredPosts = posts.filter((post) => {
    return (
      (post.category === activeTab || activeTab === "all") &&
      (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })

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
            }}
          >
            {tab.label}
          </StyledButton>
        ))}
      </StyledTabButtons>
      <NumberAndSearchBox>
        <NumberBox>
          전체<StyledNumberBlue> {7}</StyledNumberBlue>개 &nbsp;&nbsp;&nbsp; 글
          <StyledNumberBlue> {1}</StyledNumberBlue>개
        </NumberBox>

        <SelectAndSearchBox>
          <SelectPageBox>
            검색 &nbsp; <SelectPages>모든 카테고리</SelectPages>
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
        <StyledSearchContainer>
          <StyledCategoryButton
            onClick={() => {
              setCategoryOpen(!categoryOpen)
            }}
          >
            카테고리 {categoryOpen ? "▲" : "▼"} {categorySelected}
          </StyledCategoryButton>

          {categoryOpen && (
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
          )}
        </StyledSearchContainer>
        <StyledPostTitelPostName>글제목</StyledPostTitelPostName>
        <StyledPostTitelPostDay>작성일자 </StyledPostTitelPostDay>
        <StyledPostTitelPostLikes>좋아요 수 </StyledPostTitelPostLikes>
        <StyledPostTitelPostCommentNum>댓글 수 </StyledPostTitelPostCommentNum>
      </StyledPostTitleBox>
      <StyledPostContainer>
        {filteredPosts.length === 0 ? (
          <p>작성된 게시글이 없습니다.</p>
        ) : (
          <StyledPostList>
            {filteredPosts.map((post) => (
              <StyledPost key={post.id}>
                <StyledPostCategory>{post.category}</StyledPostCategory>
                <h3>{post.title}</h3>
                <p>작성 일자: {post.date}</p>
                <p>좋아요: {post.likes}</p>
                <p>댓글: {post.comments}</p>
              </StyledPost>
            ))}
          </StyledPostList>
        )}
      </StyledPostContainer>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  padding: 20px;
  width: 1000px;
  margin: auto;
`

const StyledTitle = styled.div`
  margin-top: 78px;
  margin-bottom: 50px;
  font-size: 25px;
  font-weight: bold;
`

const StyledSearchContainer = styled.span`
  display: inline;
  width: 100px;
`

const StyledCategoryButton = styled.button`
  border: none;
  cursor: pointer;
  float: left;
  margin-top: -2px;
  margin-left: 16px;
  font-size: 14px;
  background-color: white;
`

const StyledCategoryDropdown = styled.div<{ open: boolean }>`
  position: absolute;
  top: ${({ open }) => (open ? "40px" : "-200px")};
  left: 0;
  width: 40px;
  transition: top 0.3s ease;
  z-index: 1;
`

const StyledCategoryList = styled.ul`
  list-style: none;
  padding: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const StyledCategoryItem = styled.li<{ selected: boolean }>`
  padding: 3px 40px;
  margin: 2px 10px;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#f0f0f0" : "transparent")};
`

const StyledSearchInput = styled.input`
  padding: 10px;
  width: 360px;
  height: 16px;
  background-color: var(--color-line-gray-200);
  float: right;
  border-radius: 5px;
  border: 1px solid #dadada;
`

const StyledTabButtons = styled.div`
  background-color: #f4f4f4;
  height: 50px;
  display: flex;
  border: 1px solid #dadada;
  margin-bottom: 20px;
  border-radius: 10px 10px 0px 0px;
`

const StyledButton = styled.button`
  border-radius: ${(props) =>
    props.children === "질의응답" ? " 9px 0px 0px 0px" : ""};
  background-color: ${(props) =>
    props.className === "active" ? "#fff" : "transparent"};
  border-style: solid;
  border-color: #dadada;
  border-width: 0px 1px 0px 0px;
  padding: 10px 20px;
  height: ${(props) => (props.className === "active" ? "51px" : "")};
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
  border: 1px solid #ccc;
  background-color: #f8f8f8;
  padding: 20px;
  margin-bottom: 20px;
`

const StyledPostList = styled.ul`
  list-style: none;
  padding: 0;
`

const StyledPost = styled.li`
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #f8f8f8;
`

const StyledPostCategory = styled.p`
  font-weight: bold;
  margin-bottom: 5px;
`

const StyledNumberBlue = styled.span`
  color: #0c356a;
  font-weight: bold;
`

const NumberAndSearchBox = styled.div`
  position: relative;
  height: 60px;
  width: 100%;
`

const NumberBox = styled.span`
  position: absolute;
  margin-top: 13px;
  margin-left: 20px;
`

const SelectAndSearchBox = styled.span`
  float: right;
  width: 630px;
`

const SelectPageBox = styled.span`
  font-size: 14px;
`

const SelectPages = styled.span`
  display: inline-block;
  border: 1px solid #dadada;
  padding: 10px;
  width: 170px;
  border-radius: 5px;
  font-size: 14px;
  height: 16px;
`

const StyledPostTitleBox = styled.div`
  width: 100%;
  text-align: right;
  height: 30px;
  margin-top: 10px;
  margin-bottom: 20px;
  border-top: 1px solid #dadada;
  padding-top: 14px;
  border-bottom: 1px solid #333333;
`

const StyledPostTitelPostName = styled.span`
  float: left;
  width: 500px;
  text-align: center;
  font-size: 14px;
`

const StyledPostTitelPostDay = styled.span`
  display: inline-block;
  width: 110px;
  text-align: center;
  font-size: 14px;
`

const StyledPostTitelPostLikes = styled.span`
  display: inline-block;
  width: 100px;
  text-align: center;
  font-size: 14px;
`

const StyledPostTitelPostCommentNum = styled.span`
  display: inline-block;
  width: 90px;
  text-align: center;
  font-size: 14px;
`

export default MyPostPage
