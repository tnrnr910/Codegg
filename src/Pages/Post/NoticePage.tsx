import React from "react"
import SideRanking from "../../Components/SideRanking"
import { useNavigate } from "react-router"
import styled from "styled-components"
import { useQuery } from "react-query"
import { getPosts } from "../../axios/api"
// import Buttons from "../../Components/Buttons"
import { type Timestamp } from "firebase/firestore"

function NoticePage() {
  const navigate = useNavigate()
  const { isLoading, data } = useQuery("posts", getPosts)

  const list: any = data

  if (isLoading) {
    return <div>로딩중입니다..</div>
  }
  return (
    <>
      <StyledContainer>
        <SideRanking />
        <StyledBox>
          <StyledTitle>공지사항</StyledTitle>
          <StyledPostTitleBox>
            <StyledPostTitleCategory>
              <SelectPages>
                <StyledSearchContainer></StyledSearchContainer>
              </SelectPages>
            </StyledPostTitleCategory>
            <StyledPostTitlePostName>글제목</StyledPostTitlePostName>
            <StyledPostTitlePostDay>작성일자 </StyledPostTitlePostDay>
          </StyledPostTitleBox>
          <Body>
            <BodyDiv>
              <>
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
                            <ListCategory> {info.postCategory}</ListCategory>
                            <StyledPostTitle>{info.postTitle}</StyledPostTitle>
                          </ListDiv>
                        </ListContainer>
                      )
                    }
                  )}
              </>
            </BodyDiv>
          </Body>
          <WriteBtnBox>
            <button
              onClick={() => {
                navigate("/WritePage/Notice")
              }}
            >
              글쓰기
            </button>
          </WriteBtnBox>
          {/* <Pagination>페이지네이션</Pagination> */}
        </StyledBox>
      </StyledContainer>
    </>
  )
}

export default NoticePage

const StyledPostTitle = styled.p`
  width: 500px;
  justify-content: left;
  padding-top: 3px;
`

const StyledContainer = styled.div`
  margin-top: 4rem;
  width: 100%;
  display: flex;
  height: 800px;
`

const StyledBox = styled.div`
  width: 952px;
  display: flex;
  flex-direction: column;
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
  width: 50rem;
  text-align: center;
  font-size: 0.875rem;
`

const StyledPostTitlePostDay = styled.span`
  display: inline-block;
  width: 6.875rem;
  text-align: center;
  font-size: 0.875rem;
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
const ListCategory = styled.div`
  border: solid #e7e7e7 1px;
  padding: 3px 3px 3px 3px;
  color: #9f9f9f;
`
const WriteBtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 2rem 0 1rem 0;
`

// const Pagination = styled.div``
