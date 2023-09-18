import React, { useEffect, useState } from "react"
import { getPostsOfBoard } from "../axios/api"
import { styled } from "styled-components"
import { useQuery } from "react-query"
import { useNavigate } from "react-router"
import { formatDate } from "./DateChange"
import Pagination from "react-js-pagination"
import "./pagination.css"

interface PointApplyProps {
  categorySelected: string
  postBoard: string
}

interface StyledPostTitleProps {
  Bold: string
  color: string
  fontsize: string
}

function Postbody({ categorySelected, postBoard }: PointApplyProps) {
  const navigate = useNavigate()
  const { isLoading, data } = useQuery(
    ["posts", postBoard],
    async () => await getPostsOfBoard(postBoard)
  )
  const list: any = data
  const [currentPost, setCurrentPost] = useState(list) // 게시판 목록에 보여줄 게시글
  const [page, setPage] = useState<number>(1) // 현재 페이지 번호

  const postPerPage = 20 // 페이지 당 게시글 개수
  const indexOfLastPost = page * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage

  const postLength = list?.length

  const handlePageChange = (page: number) => {
    setPage(page)
  }

  useEffect(() => {
    if (list !== undefined) {
      setCurrentPost(list.slice(indexOfFirstPost, indexOfLastPost))
    }
  }, [list, page, indexOfFirstPost, indexOfLastPost])

  if (isLoading) {
    return <div>로딩중입니다..</div>
  }

  return (
    <>
      <Body>
        <BodyDiv>
          {categorySelected === "카테고리" ? (
            <>
              {currentPost?.map(
                (info: {
                  id: string
                  postTime: number
                  postTitle: string
                  postCategory: string
                  likes: number
                  comments: number
                  postSkin: string
                  postColor: string
                  postFontsize: string
                  postDisplayName: string
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
                        <StyledPostTitle
                          Bold={info.postSkin}
                          color={info.postColor}
                          fontsize={info.postFontsize}
                        >
                          {info.postTitle}
                        </StyledPostTitle>
                        <StyledPostDisplayName>
                          {info.postDisplayName}
                        </StyledPostDisplayName>
                        <TimeAndLikeAndCommentBox>
                          <p>{formatDate(info.postTime)}</p>
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
              {currentPost
                ?.filter(
                  (item: { postCategory: string }) =>
                    categorySelected !== "카테고리" &&
                    item.postCategory === categorySelected
                )
                .map(
                  (info: {
                    id: string
                    postTime: number
                    postTitle: string
                    postCategory: string
                    likes: number
                    comments: number
                    postSkin: string
                    postColor: string
                    postFontsize: string
                    postDisplayName: string
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
                          <StyledPostTitle
                            Bold={info.postSkin}
                            color={info.postColor}
                            fontsize={info.postFontsize}
                          >
                            {info.postTitle}
                          </StyledPostTitle>
                          <StyledPostDisplayName>
                            {info.postDisplayName}
                          </StyledPostDisplayName>
                          <TimeAndLikeAndCommentBox>
                            <p>{formatDate(info.postTime)}</p>
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
        {/* # yarn add react-js-pagination @types/react-js-pagination 설치 */}
        <Pagination
          activePage={page}
          itemsCountPerPage={postPerPage}
          totalItemsCount={postLength}
          pageRangeDisplayed={10}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={handlePageChange}
        />
      </Body>
    </>
  )
}

export default Postbody

const BodyDiv = styled.div`
  margin: 0 20px;
`

const ListContainer = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  height: 25px;
  padding: 0.6rem 0;
`

const Body = styled.div`
  width: 100%;
`

const StyledPostTitle = styled.p<StyledPostTitleProps>`
  width: 420px;
  justify-content: left;
  color: ${(props) => props.color ?? "black"};
  font-size: ${(props) => props.fontsize ?? ""};
  font-weight: ${(props) => props.Bold ?? "initial"};
  padding-top: 3px;
`
const StyledPostDisplayName = styled.div`
  width: 150px;
`

const StyledPost = styled.div`
  display: flex;
  justify-content: space-between;
  border: 0.0625rem solid #ffffff;
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

const TimeAndLikeAndCommentBox = styled.div`
  display: flex;
  justify-content: space-between;
  float: right;
  width: 200px;
`

const StyledNumber = styled.p`
  margin-right: 20px;
`
