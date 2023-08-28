import React from "react"
import { styled } from "styled-components"
import { useQuery } from "react-query"
import { useParams, useNavigate } from "react-router"
import { getPosts } from "../axios/api"

function DetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { isLoading, data } = useQuery("posts", getPosts)

  const postInfo: any = data?.find((item) => item.id === id)

  if (isLoading) {
    return <div>로딩중 ...</div>
  }

  return (
    <>
      <Container>
        <Title>{postInfo.postBoard}</Title>
        <DetailContainer>
          <Detailtitle>
            <DetailtitleBox>
              <DetailCategory>{postInfo.postCategory}</DetailCategory>
              <DetailTitleDiv>{postInfo.postTitle}</DetailTitleDiv>
            </DetailtitleBox>
            <BtnBox>
              <DeclarationBtn>신고</DeclarationBtn>
              <LikeBtn>좋아요</LikeBtn>
            </BtnBox>
          </Detailtitle>
          <DetailUser>
            <DetailUserName>{postInfo.postDisplayName}</DetailUserName>
            <DetailUserInfo>
              <div>좋아요</div>
              <div>댓글수</div>
            </DetailUserInfo>
          </DetailUser>
          <DetailContent>
            <DetailContentBody>{postInfo.postContent}</DetailContentBody>
          </DetailContent>
        </DetailContainer>
        <ComentContainer>
          <ComentHead>댓글</ComentHead>
          <Comentdoby>댓글컴포넌트</Comentdoby>
        </ComentContainer>
        <ButtonBox>
          <ListBtn
            onClick={() => {
              navigate("/")
            }}
          >
            목록
          </ListBtn>
          <TopBtn>TOP</TopBtn>
        </ButtonBox>
      </Container>
    </>
  )
}

export default DetailPage

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 0px 80px 0px;
`

const Title = styled.div`
  width: 58rem;
  height: 2rem;
  margin-bottom: 37px;
  font-size: 25px;
  font-weight: bold;
`
const DetailContainer = styled.div`
  display: flex;
  width: 58rem;
  height: 32rem;
  gap: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: solid #dadada 1px;
  border-radius: 16px;
  background-color: #e0e0e0;
`

const Detailtitle = styled.div`
  display: flex;
  width: 52rem;
  height: 3rem;
  justify-content: space-between;
  align-items: center;
`

const BtnBox = styled.div`
  display: flex;
  gap: 19px;
`

const DeclarationBtn = styled.button`
  font-size: 16px;
  color: #3b3b3b;
  background-color: transparent;
  border: transparent;
`

const LikeBtn = styled.button`
  font-size: 16px;
  color: #3b3b3b;
  background-color: transparent;
  border: transparent;
`

const DetailUser = styled.div`
  width: 52rem;
  height: 3rem;
  border: solid #dadada 1px;
  border-radius: 7px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const DetailUserName = styled.div`
  font-size: 13px;
  color: #b5b5b5;
  padding-left: 16px;
`

const DetailUserInfo = styled.div`
  font-size: 13px;
  color: #b5b5b5;
  display: flex;
  gap: 1rem;
  padding-right: 22px;
`
const DetailContent = styled.div`
  width: 52rem;
  height: 19rem;
  border: solid #dadada 1px;
  border-radius: 7px;
  background-color: white;
`
const DetailContentBody = styled.div`
  font-size: 14px;
  margin: 17px 0px 0px 17px;
`

const ComentContainer = styled.div`
  padding-top: 48px;
`

const ComentHead = styled.div`
  width: 7rem;
  height: 2rem;
`

const Comentdoby = styled.div`
  width: 58rem;
  border: solid #dadada 1px;
`
const DetailtitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`
const DetailCategory = styled.div`
  height: 18px;
  border: solid #e7e7e7 1px;
  padding: 3px 3px 3px 3px;
  color: #9f9f9f;
`

const DetailTitleDiv = styled.div`
  font-size: 19px;
  font-weight: Bold;
  color: #333333;
`

const ButtonBox = styled.div`
  width: 58rem;
  display: flex;
  justify-content: flex-end;
  gap: 14px;
`

const ListBtn = styled.div`
  font-size: 14px;
  font-weight: bold;
  border-radius: 4px;
  padding: 6px 18px 6px 18px;
  color: #ffffff;
  background-color: #9f9f9f;
  cursor: pointer;
`

const TopBtn = styled.div`
  font-size: 14px;
  font-weight: bold;
  border-radius: 4px;
  padding: 6px 18px 6px 18px;
  color: #ffffff;
  background-color: #9f9f9f;
  cursor: pointer;
`
