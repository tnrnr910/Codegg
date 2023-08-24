import React from "react"
import { styled } from "styled-components"

function MainPage() {
  return (<>
  <Banner><div>배너</div></Banner>
  <Container>
  <RankedBox>Top Writers</RankedBox>
  <PostsContainer>
    <PostBox>
      <Title>
        <TitleDiv>질의응답</TitleDiv><TitleDiv2>더보기</TitleDiv2>
        </Title>
        <Body>
        <BodyDiv>
          내용
          </BodyDiv>
        </Body>
    </PostBox>
    <PostBox>
       <Title>
        <TitleDiv>모임</TitleDiv><TitleDiv2>더보기</TitleDiv2>
        </Title>
        <Body>
        <BodyDiv>
          내용
          </BodyDiv>
          </Body>
    </PostBox>
    <PostBox>
        <Title>
        <TitleDiv>코딩 팁</TitleDiv><TitleDiv2>더보기</TitleDiv2>
        </Title>
        <Body>          
          <BodyDiv>
          내용
          </BodyDiv>
          </Body>
    </PostBox>
    <PostBox>      
      <Title>
        <TitleDiv>공지사항</TitleDiv><TitleDiv2>더보기</TitleDiv2>
        </Title>
        <Body>
          <BodyDiv>
          내용
          </BodyDiv>
          </Body>
      </PostBox>
  </PostsContainer>
  </Container>

  </>)
}

export default MainPage

const Banner = styled.div`
width: 100%;
height: 25rem;
border: solid #D9D9D9 1px;
display: flex;
justify-content: center;
align-items: center;
`

const Container = styled.div`
width: 100%;
height: 59rem;
display: flex;
overflow: auto;
`

const RankedBox = styled.div`
  width: 16rem;
  height: 17rem;
  border: solid #D9D9D9 1px;
  border-radius: Mixed;
  margin: 10rem 102px 48px ;
  padding: 1.5rem 1.5rem 1.5rem 1.5rem;
`

const PostsContainer = styled.div`
  width: 72rem;
  height: 51rem;
  margin-top: 2.3rem;
  display: flex;
  flex-wrap: wrap;
  gap: 22px;

`

const PostBox = styled.div`
  width: 35rem;
  height:25rem;
  border: solid #D9D9D9 1px;
  border-radius: 1rem;
`

const Title = styled.div`
  width: 35rem;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const TitleDiv = styled.div`
  margin-left: 24px ;
`

const TitleDiv2= styled.div`
  margin-right: 26px ;
  cursor: pointer;
`
const Body = styled.div`
  width: 35rem;
  border-top: solid #DADADA 1px;
`

const BodyDiv = styled.div`
  margin-left: 24px;
`