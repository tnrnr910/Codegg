import React, { useState } from "react"
import SIdeRanking from "../../Components/SideRanking"
import { useNavigate } from "react-router"
import styled from "styled-components"
import { useQuery } from "react-query"
import { getPosts } from "../../axios/api"
import Buttons from "../../Components/Buttons"
import Postbody from "../../Components/Postbody"

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
                  postTime: number
                  postTitle: number
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
            <StyledPostTitleDisplayName>작성자</StyledPostTitleDisplayName>
            <StyledPostTitlePostDay>작성일자 </StyledPostTitlePostDay>
            <StyledPostTitlePostLikes>좋아요 수 </StyledPostTitlePostLikes>
            <StyledPostTitlePostCommentNum>
              댓글 수
            </StyledPostTitlePostCommentNum>
          </StyledPostTitleBox>
          <Postbody categorySelected={categorySelected} postBoard="meetups" />
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

const StyledContainer = styled.div`
  margin-top: 4rem;
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
  width: 6rem;
  text-align: center;
  font-size: 0.875rem;
`

const StyledPostTitlePostName = styled.span`
  float: left;
  width: 22rem;
  text-align: center;
  font-size: 0.875rem;
`

const StyledPostTitleDisplayName = styled.span`
  display: inline-block;
  width: 12rem;
  text-align: center;
  font-size: 0.875rem;
`

const StyledPostTitlePostDay = styled.span`
  display: inline-block;
  width: 5rem;
  text-align: center;
  font-size: 0.875rem;
`

const StyledPostTitlePostLikes = styled.span`
  display: inline-block;
  width: 4rem;
  text-align: center;
  font-size: 0.875rem;
`

const StyledPostTitlePostCommentNum = styled.span`
  display: inline-block;
  width: 5rem;
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
