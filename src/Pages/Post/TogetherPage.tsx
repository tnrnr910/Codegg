import React, { useState } from "react"
import SIdeRanking from "../../Components/SideRanking"
import { useNavigate } from "react-router"
import styled from "styled-components"
import { useQuery } from "react-query"
import { getPosts, formatDate } from "../../axios/api"
import { type Timestamp } from "firebase/firestore"
import Buttons from "../../Components/Buttons"

function TogetherPage() {
  const navigate = useNavigate()
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [categorySelected, setCategorySelected] = useState("카테고리")
  const { isLoading, data } = useQuery("posts", getPosts)

  const list: any = data

  if (isLoading) {
    return <div>로딩중입니다..</div>
  }

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
              setCategorySelected("파이썬")
              setCategoryOpen(false)
            }}
            selected={categorySelected === "파이썬"}
          >
            파이썬
          </StyledCategoryItem>
          <StyledCategoryItem
            onClick={() => {
              setCategorySelected("기타")
              setCategoryOpen(false)
            }}
            selected={categorySelected === "기타"}
          >
            기타
          </StyledCategoryItem>
        </StyledCategoryList>
      </StyledCategoryDropdown>
    )
  }
  return (
    <>
      <StyledContainer>
        <SIdeRanking />
        <StyledBox>
          <StyledTitle>모임</StyledTitle>
          <StyledHead>
            {list
              .filter(
                (item: { postBoard: string }) => item.postBoard === "Notice"
              )
              .map(
                (info: {
                  id: string
                  postTime: Timestamp
                  postTitle: string
                  postCategory: string
                  likes: number
                  comments: number
                }) => {
                  return (
                    <ListContainer key={info.id}>
                      <ListDiv
                        onClick={() => {
                          navigate(`/detailPage/${info.id}`)
                        }}
                      >
                        {info.postTitle}
                      </ListDiv>
                    </ListContainer>
                  )
                }
              )}
          </StyledHead>
          <StyledPostTitleBox>
            <StyledPostTitleCategory>
              <SelectPages>
                <StyledSearchContainer>
                  <StyledCategoryButton
                    onClick={() => {
                      setCategoryOpen(!categoryOpen)
                    }}
                  >
                    {categorySelected} {categoryOpen ? "∧" : "∨"}
                  </StyledCategoryButton>
                  {categoryOpen && <DropDown />}
                </StyledSearchContainer>
              </SelectPages>
            </StyledPostTitleCategory>
            <StyledPostTitlePostName>글제목</StyledPostTitlePostName>
            <StyledPostTitlePostDay>작성일자 </StyledPostTitlePostDay>
            <StyledPostTitlePostLikes>좋아요 수 </StyledPostTitlePostLikes>
            <StyledPostTitlePostCommentNum>
              댓글 수
            </StyledPostTitlePostCommentNum>
          </StyledPostTitleBox>
          <Body>
            <BodyDiv>
              {categorySelected === "카테고리" ? (
                <>
                  {list
                    .filter(
                      (item: { postBoard: string }) =>
                        item.postBoard === "meetups"
                    )
                    .map(
                      (info: {
                        id: string
                        postTime: Timestamp
                        postTitle: string
                        postCategory: string
                        likes: number
                        comments: number
                      }) => {
                        return (
                          <ListContainer key={info.id}>
                            <StyledPost
                              onClick={() => {
                                navigate(`/detailPage/${info.id}`)
                              }}
                            >
                              <StyledPostCategory>
                                {info.postCategory}
                              </StyledPostCategory>
                              <StyledPostTitle>
                                {info.postTitle}
                              </StyledPostTitle>
                              <TimeAndLikeAndCommentBox>
                                <p>{formatDate(info.postTime.toDate())}</p>
                                <StyledNumber>{info.likes}</StyledNumber>
                                <StyledNumber>{info.comments}</StyledNumber>
                              </TimeAndLikeAndCommentBox>
                            </StyledPost>
                          </ListContainer>
                        )
                      }
                    )}
                </>
              ) : (
                <>
                  {list
                    .filter(
                      (item: { postBoard: string }) =>
                        item.postBoard === "meetups"
                    )
                    .filter(
                      (item: { postCategory: string }) =>
                        categorySelected !== "카테고리" &&
                        item.postCategory === categorySelected
                    )
                    .map(
                      (info: {
                        id: string
                        postTime: Timestamp
                        postTitle: string
                        postCategory: string
                        likes: number
                        comments: number
                      }) => {
                        return (
                          <ListContainer key={info.id}>
                            <StyledPost
                              onClick={() => {
                                navigate(`/detailPage/${info.id}`)
                              }}
                            >
                              <StyledPostCategory>
                                {info.postCategory}
                              </StyledPostCategory>
                              <StyledPostTitle>
                                {info.postTitle}
                              </StyledPostTitle>
                              <TimeAndLikeAndCommentBox>
                                <p>{formatDate(info.postTime.toDate())}</p>
                                <StyledNumber>{info.likes}</StyledNumber>
                                <StyledNumber>{info.comments}</StyledNumber>
                              </TimeAndLikeAndCommentBox>
                            </StyledPost>
                          </ListContainer>
                        )
                      }
                    )}
                </>
              )}
            </BodyDiv>
          </Body>
          <WriteBtnBox>
            <Buttons
              onClick={() => {
                navigate("/WritePage/meetups")
              }}
            >
              글쓰기
            </Buttons>
          </WriteBtnBox>
          {/* <Pagination>페이지네이션</Pagination> */}
        </StyledBox>
      </StyledContainer>
    </>
  )
}

export default TogetherPage

const StyledPostTitle = styled.p`
  width: 500px;
  justify-content: left;
  padding-top: 3px;
`

const StyledNumber = styled.p`
  margin-right: 20px;
`

const StyledPost = styled.div`
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
`

const TimeAndLikeAndCommentBox = styled.td`
  display: flex;
  justify-content: space-between;
  float: right;
  width: 255px;
  margin-right: 24px;
`

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
`

const StyledBox = styled.div`
  width: 952px;
  display: flex;
  flex-direction: column;
`

const StyledHead = styled.div`
  width: 100%;
  background-color: #f6f6f6;
  padding: 20px 20px 20px 20px;
`

const StyledTitle = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 34px;
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
const StyledPostTitleCategory = styled.span`
  float: left;
  width: 5.625rem;
  text-align: center;
  font-size: 0.875rem;
`

const StyledPostTitlePostName = styled.span`
  float: left;
  width: 31.25rem;
  text-align: center;
  font-size: 0.875rem;
  margin-left: 38px;
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

const StyledCategoryDropdown = styled.div<{ open: boolean }>`
  position: absolute;
  top: ${({ open }) => (open ? "33%" : "-12.5rem")};
  transition: top 0.3s ease;
  z-index: 1;
  width: 5%;
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

const SelectPages = styled.span`
  display: inline;
  width: 8rem;
  border-radius: 0.3125rem;
  font-size: 0.875rem;
  height: 1rem;
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

const Body = styled.div`
  width: 100%;
`

const BodyDiv = styled.div`
  margin-left: 24px;
`

const ListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 25px;
  align-items: center;
`

const ListDiv = styled.div`
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`

const WriteBtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 2rem 0 1rem 0;
`

// const Pagination = styled.div``
