import React from "react"
import { styled } from "styled-components"
import { useQuery } from "react-query"
import { useParams } from "react-router"
import { getPosts } from "../axios/api"

function DetailPage() {
  const { id } = useParams()

  const { isLoading, data } = useQuery("posts", getPosts)

  const postInfo: any = data?.find((item) => item.id === id)

  if (isLoading) {
    return <div>로딩중 ...</div>
  }

  return (
    <>
      <Container>
        <Title>{postInfo.postCategory}</Title>
        <DetailContainer>
          <Detailtitle>
            {postInfo.postTitle}
            <BtnBox>
              <button>신고</button>
              <button>좋아요</button>
            </BtnBox>
          </Detailtitle>
          <DetailUser>{postInfo.postDisplayName} </DetailUser>
          <DetailContent>{postInfo.postContent}</DetailContent>
        </DetailContainer>
        <ComentContainer>
          <ComentHead>댓글</ComentHead>
          <Comentdoby>댓글컴포넌트</Comentdoby>
        </ComentContainer>
      </Container>
    </>
  )
}

export default DetailPage

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5rem;
`

const Title = styled.div`
  width: 7rem;
  height: 2rem;
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
  background-color: #afacac;
`

const Detailtitle = styled.div`
  display: flex;
  width: 52rem;
  height: 3rem;
  justify-content: space-between;
`

const BtnBox = styled.div`
  gap: 24px;
`

const DetailUser = styled.div`
  width: 52rem;
  height: 3rem;
  border: solid #dadada 1px;
  border-radius: 7px;
  background-color: white;
`

const DetailContent = styled.div`
  width: 52rem;
  height: 19rem;
  border: solid #dadada 1px;
  border-radius: 7px;
  background-color: white;
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
