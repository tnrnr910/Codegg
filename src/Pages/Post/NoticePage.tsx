import React from "react"
import SideRanking from "../../Components/SideRanking"
import { useNavigate } from "react-router"
import styled from "styled-components"
import { useQuery } from "react-query"
import { getPosts } from "../../axios/api"

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
            <StyledPostTitlePostLikes>좋아요 수 </StyledPostTitlePostLikes>
            <StyledPostTitlePostCommentNum>
              댓글 수
            </StyledPostTitlePostCommentNum>
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
                      postTitle: string
                      postCategory: string
                    }) => {
                      return (
                        <ListContainer key={info.id}>
                          <ListDiv
                            onClick={() => {
                              navigate(`/detailPage/${info.id}`)
                            }}
                          >
                            <ListCategory> {info.postCategory}</ListCategory>
                            {info.postTitle}
                          </ListDiv>
                        </ListContainer>
                      )
                    }
                  )}
              </>
            </BodyDiv>
          </Body>
          <WriteBtnBox>
            <WriteBtn
              onClick={() => {
                navigate("/WritePage/Notice")
              }}
            >
              글쓰기
            </WriteBtn>
          </WriteBtnBox>
          <div> 페이지 네이션</div>
        </StyledBox>
      </StyledContainer>
    </>
  )
}

export default NoticePage

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
`

const StyledBox = styled.div`
  width: 952px;
  margin-top: 80px;
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
  height: 100%;
`

const BodyDiv = styled.div`
  margin-left: 24px;
`

const ListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0px;
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
`
const WriteBtn = styled.button`
  font-size: 14px;
  font-weight: bold;
  width: 64px;
  height: 28px;
  border-radius: 4;
  margin: 7px 12px 12px 7px;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: #0c356a;
  cursor: pointer;
`
