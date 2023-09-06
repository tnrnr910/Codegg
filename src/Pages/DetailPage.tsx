import React, { useEffect, useState } from "react"
import { styled } from "styled-components"
import { useQuery } from "react-query"
// import { getAuth } from "firebase/auth"
import { useParams, useNavigate } from "react-router-dom"
import { findLikes, getPost, getPosts, setLikes } from "../axios/api"
import Comments from "../Components/Comments"
import { doc, onSnapshot } from "firebase/firestore"
import { db, auth } from "../axios/firebase"
import { PiSiren } from "react-icons/pi"
import { AiOutlineLike } from "react-icons/ai"
import { FaRegComment } from "react-icons/fa"
interface Post {
  id: string
  postBoard: string
  postCategory: string
  postContent: string
  postDisplayName: string
  postImgUrl: string
  postTitle: string
  postTime: number
  postUserEmail: string
  likes: number
}

function DetailPage() {
  const { id } = useParams<string>()

  const navigate = useNavigate()
  const [postInfo, setPostInfo] = useState<Post>()
  const [likesCount, setLikesCount] = useState(0)
  const [checkLikeBtn, setCheckLikeBtn] = useState<boolean>(false)
  const { isLoading } = useQuery("posts", getPosts)

  // post 정보를 하나만 가져오기
  useEffect(() => {
    if (id !== undefined) {
      void getPost(id).then((dummyData: any) => {
        setPostInfo(dummyData)
        if (postInfo !== undefined) {
          setLikesCount(postInfo.likes)
        }
      })

      // 실시간 좋아요 숫자 업데이트
      onSnapshot(doc(db, "posts", id), (doc) => {
        setLikesCount(doc?.data()?.likes)
        console.log(doc.data())
      })
    }

    // 좋아요 내가 눌렀는지 확인하는 기능
    // TODO: userId는 로그인 했을 때만 존재하는 값!
    if (auth.currentUser != null) {
      findLikes(auth.currentUser.email, id).then((bool: boolean) => {
        if (bool) {
          setCheckLikeBtn(true)
        } else {
          setCheckLikeBtn(false)
        }
      })
    }
  }, [])

  // 좋아요 버튼을 눌렀을 때 +/- 해주는 기능
  const clickLikeFn = () => {
    const email = auth.currentUser?.email

    findLikes(email, id).then((bool: boolean) => {
      if (bool) {
        setCheckLikeBtn(true)
        setLikes(true, email, id)
      } else {
        setCheckLikeBtn(false)
        setLikes(false, email, id)
      }
    })
  }

  if (isLoading) {
    return <div>로딩중입니다...</div>
  }

  return (
    <>
      <Container>
        <DetailContainer>
          <Detailtitle>
            <DetailtitleBox>
              <DetailCategory>{postInfo?.postCategory}</DetailCategory>
              <DetailTitleDiv>{postInfo?.postTitle}</DetailTitleDiv>
            </DetailtitleBox>
            <BtnBox>
              <DeclarationBtn>
                <PiSiren size="30px" />
              </DeclarationBtn>
              <LikeBtn onClick={clickLikeFn}>
                {checkLikeBtn ? (
                  <AiOutlineLike size="30px" />
                ) : (
                  <AiOutlineLike size="30px" />
                )}
              </LikeBtn>
            </BtnBox>
          </Detailtitle>
          <DetailUser>
            <DetailUserName>{postInfo?.postDisplayName}</DetailUserName>
            <DetailUserInfo>
              <div>
                <AiOutlineLike size="12px" />
                {likesCount}
              </div>
              <div>
                <FaRegComment size="12px" />
                댓글수
              </div>
            </DetailUserInfo>
          </DetailUser>
          <DetailContent>
            <DetailContentBody>{postInfo?.postContent}</DetailContentBody>
          </DetailContent>
          <EditBox>
            <EditBtn>수정</EditBtn>
            <DeleteBtn>삭제</DeleteBtn>
          </EditBox>
        </DetailContainer>
        <Comments />
        <ButtonBox>
          <ListBtn
            onClick={() => {
              navigate(-1)
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

const EditBtn = styled.button`
  cursor: pointer;
`

const EditBox = styled.div`
  width: 52rem;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`

const DeleteBtn = styled.button`
  cursor: pointer;
`
