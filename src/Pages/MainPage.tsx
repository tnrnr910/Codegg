import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { styled } from "styled-components"
// import { useQuery } from "react-query"
import { getBoardPosts } from "../axios/api"
import SideRanking from "../Components/SideRanking"

function MainPage() {
  const navigate = useNavigate()
  // const { isLoading, data } = useQuery("posts", getPosts)
  const [dataQuestions, setDataQuestions] = useState([])
  const [dataMeetups, setDataMeetups] = useState([])
  const [dataTips, setDataTips] = useState([])
  const [dataNotice, setDataNotice] = useState([])

  // const list: any = data
  // console.log(list)
  // if (isLoading) {
  //   return <div>로딩중입니다..</div>
  // }
  useEffect(() => {
    getBoardPosts("questions", 8).then((dummyData: any) => {
      setDataQuestions(dummyData)
    })
    getBoardPosts("meetups", 8).then((dummyData: any) => {
      setDataMeetups(dummyData)
    })
    getBoardPosts("tips", 8).then((dummyData: any) => {
      setDataTips(dummyData)
    })
    getBoardPosts("Notice", 8).then((dummyData: any) => {
      setDataNotice(dummyData)
    })
  }, [])

  const ClickLikeBtn: any = (id: string) => {
    navigate(`/DetailPage/${id}`)
  }

  return (
    <>
      <Banner>
        <img
          src="https://i.postimg.cc/65pxBtZD/banner2.png"
          alt="main-banner"
        />
      </Banner>
      <Container>
        <SideRanking />
        <PostsContainer>
          <PostBox>
            <Title>
              <TitleDiv>질의응답</TitleDiv>
              <TitleDiv2
                onClick={() => {
                  navigate("/QnAPage")
                }}
              >
                더보기 ＞
              </TitleDiv2>
            </Title>
            <Body>
              <BodyDiv>
                {dataQuestions.map(
                  (info: {
                    id: string
                    postTitle: string
                    postCategory: string
                    likes: number
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
                        <ListBox>
                          <LikeDiv>
                            <img src="\WritePicturIcon.png" />
                            {info.likes}
                          </LikeDiv>
                          <div> 댓글수</div>
                        </ListBox>
                      </ListContainer>
                    )
                  }
                )}
              </BodyDiv>
            </Body>
          </PostBox>
          <PostBox>
            <Title>
              <TitleDiv>모임</TitleDiv>
              <TitleDiv2
                onClick={() => {
                  navigate("/TogetherPage")
                }}
              >
                더보기 ＞
              </TitleDiv2>
            </Title>
            <Body>
              <BodyDiv>
                {dataMeetups.map(
                  (info: {
                    id: string
                    postTitle: string
                    postCategory: string
                    likes: number
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
                        <ListBox>
                          <LikeDiv onClick={ClickLikeBtn}>
                            <img src="\WritePicturIcon.png" />
                            {info.likes}
                          </LikeDiv>
                          <div> 댓글수</div>
                        </ListBox>
                      </ListContainer>
                    )
                  }
                )}
              </BodyDiv>
            </Body>
          </PostBox>
          <PostBox>
            <Title>
              <TitleDiv>코딩팁</TitleDiv>
              <TitleDiv2
                onClick={() => {
                  navigate("/TipPage")
                }}
              >
                더보기 ＞
              </TitleDiv2>
            </Title>
            <Body>
              <BodyDiv>
                {dataTips.map(
                  (info: {
                    id: string
                    postTitle: string
                    postCategory: string
                    likes: number
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
                        <ListBox>
                          <LikeDiv onClick={ClickLikeBtn}>
                            <img src="\WritePicturIcon.png" />
                            {info.likes}
                          </LikeDiv>
                          <div> 댓글수</div>
                        </ListBox>
                      </ListContainer>
                    )
                  }
                )}
              </BodyDiv>
            </Body>
          </PostBox>
          <PostBox>
            <Title>
              <TitleDiv>공지사항</TitleDiv>
              <TitleDiv2
                onClick={() => {
                  navigate("/NoticePage")
                }}
              >
                더보기 ＞
              </TitleDiv2>
            </Title>
            <Body>
              <BodyDiv>
                {dataNotice.map(
                  (info: {
                    id: string
                    postTitle: string
                    postCategory: string
                  }) => {
                    return (
                      <ListContainer key={info.id}>
                        <NoticeDiv
                          onClick={() => {
                            navigate(`/detailPage/${info.id}`)
                          }}
                        >
                          {info.postTitle}
                        </NoticeDiv>
                      </ListContainer>
                    )
                  }
                )}
              </BodyDiv>
            </Body>
          </PostBox>
        </PostsContainer>
      </Container>
    </>
  )
}

export default MainPage

const Banner = styled.div`
  width: 100%;
  height: 25rem;
  border: solid #d9d9d9 1px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > img {
    width: 100%;
    object-fit: cover;
  }
`

const Container = styled.div`
  width: 100%;
  height: 59rem;
  display: flex;
  overflow: auto;
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
  height: 25rem;
  border: solid #d9d9d9 1px;
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
  margin-left: 24px;
  font-weight: bold;
  font-size: 25px;
`

const TitleDiv2 = styled.div`
  margin-right: 26px;
  font-weight: Medium;
  font-size: 15px;
  cursor: pointer;
`
const Body = styled.div`
  width: 35rem;
  border-top: solid #dadada 1px;
`

const BodyDiv = styled.div`
  margin-left: 24px;
  margin-right: 24px;
  height: 330px;
`
const ListDiv = styled.div`
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`
const NoticeDiv = styled.div`
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  font-weight: bold;
`
const ListCategory = styled.div`
  border: solid #e7e7e7 1px;
  padding: 3px 3px 3px 3px;
  color: #9f9f9f;
`

const ListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 19px;
`

const ListBox = styled.div`
  display: flex;
`

const LikeDiv = styled.div``
