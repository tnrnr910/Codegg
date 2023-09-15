import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { styled } from "styled-components"
import { getBoardPosts } from "../axios/api"
import SideRanking from "../Components/SideRanking"
import BannerCarousel from "../Components/BannerCarousel"
import MainpageList from "../Components/MainpageList"

interface Post {
  id: string
  postCategory: string
  postTitle: string
  postContent: string
  postImgUrl: string
  postBoard: string
  postTime: number
  postUserEmail: string
  postDisplayName: string
  postSkin: string
  postColor: string
  postFontsize: string
  likes: number
  comments: number
}

function MainPage() {
  const navigate = useNavigate()
  const [dataQuestions, setDataQuestions] = useState<Post[]>([])
  const [dataMeetups, setDataMeetups] = useState<Post[]>([])
  const [dataTips, setDataTips] = useState<Post[]>([])
  const [dataNotice, setDataNotice] = useState<Post[]>([])

  useEffect(() => {
    getBoardPosts("questions", 8).then((PostsData: Post[]) => {
      setDataQuestions(PostsData)
    })
    getBoardPosts("meetups", 8).then((PostsData: Post[]) => {
      setDataMeetups(PostsData)
    })
    getBoardPosts("tips", 8).then((PostsData: Post[]) => {
      setDataTips(PostsData)
    })
    getBoardPosts("Notice", 8).then((PostsData: Post[]) => {
      setDataNotice(PostsData)
    })
  }, [])

  return (
    <>
      <BannerCarousel />
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
            <MainpageList data={dataQuestions} />
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
            <MainpageList data={dataMeetups} />
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
            <MainpageList data={dataTips} />
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

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 10px 0 40px 0;
`

const PostsContainer = styled.div`
  width: 72rem;
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
  margin: 0 24px;
  height: 330px;
  font-size: 13px;
`
const NoticeDiv = styled.div`
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  font-weight: bold;
`

const ListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 19px;
`
