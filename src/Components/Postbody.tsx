import React from "react"
import { getPosts } from "../axios/api"
import { styled } from "styled-components"
import { useQuery } from "react-query"
import { useNavigate } from "react-router"
import { formatDate } from "./DateChange"

interface PointApplyProps {
  categorySelected: string
  postBoard: string
}

interface StyledPostTitleProps {
  isBold: boolean
}

function Postbody({ categorySelected, postBoard }: PointApplyProps) {
  const navigate = useNavigate()
  const { isLoading, data } = useQuery("posts", getPosts)
  const list: any = data

  if (isLoading) {
    return <div>로딩중입니다..</div>
  }

  return (
    <>
      <Body>
        <BodyDiv>
          {categorySelected === "카테고리" ? (
            <>
              {list
                .filter(
                  (item: { postBoard: string }) => item.postBoard === postBoard
                )
                .map(
                  (info: {
                    id: string
                    postTime: number
                    postTitle: string
                    postCategory: string
                    postSkin: string
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
                          <StyledPostTitle isBold={info.postSkin === "bold"}>
                            {info.postTitle}
                          </StyledPostTitle>
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
              {list
                .filter(
                  (item: { postBoard: string }) =>
                    item.postBoard === "questions"
                )
                .filter(
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
                    postSkin: string
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
                          <StyledPostTitle isBold={info.postSkin === "bold"}>
                            {info.postTitle}
                          </StyledPostTitle>
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
      </Body>
    </>
  )
}

export default Postbody

const BodyDiv = styled.div`
  margin-left: 24px;
`

const ListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 25px;
  align-items: center;
`

const Body = styled.div`
  width: 100%;
`

const StyledPostTitle = styled.p<StyledPostTitleProps>`
  width: 500px;
  justify-content: left;
  font-weight: ${(props) => (props.isBold ? "bold" : "normal")};
  padding-top: 3px;
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

const StyledNumber = styled.p`
  margin-right: 20px;
`
