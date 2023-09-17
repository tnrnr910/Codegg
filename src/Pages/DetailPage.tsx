/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from "react"
import { styled } from "styled-components"
import { useParams, useNavigate } from "react-router-dom"
import {
  findLikes,
  getPost,
  setLikes,
  getUserLevelAndBadge
} from "../axios/api"
import Comments from "../Components/Comments"
import { auth, db } from "../axios/firebase"
import { PiSiren } from "react-icons/pi"
import { AiOutlineLike, AiFillLike } from "react-icons/ai"
import { FaRegComment } from "react-icons/fa"
import {
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  collection,
  getDocs,
  type DocumentSnapshot
} from "firebase/firestore"

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
  comments: number
}

interface LevelAndBadge {
  id: string
  badgeImg: string
  userLevel: string
}

function DetailPage() {
  const { id } = useParams<string>()
  const navigate = useNavigate()
  const [postInfo, setPostInfo] = useState<Post>()
  const [likesCount, setLikesCount] = useState(0)
  const [commentsCount, setCommentsCount] = useState(0)
  const [checkLikeBtn, setCheckLikeBtn] = useState<boolean>(false)
  const [LikeBtnOne, setLikeBtnOne] = useState<boolean>(false)
  const [userLevelAndBadge, setUserLevelAndBadge] = useState<LevelAndBadge>()

  // post 정보를 하나만 가져오기
  useEffect(() => {
    if (id !== undefined) {
      void getPost(id).then((dummyData: any) => {
        setPostInfo(dummyData)

        if (postInfo !== undefined) {
          setLikesCount(postInfo.likes)
          setCommentsCount(postInfo.comments)
        }

        // 유저레벨과 뱃지 가져오기
        void getUserLevelAndBadge().then((data: any) => {
          // postUserEmail과 일치하는 사용자 정보 찾기
          const userLevelAndBadge = data.find(
            (userLevelAndBadge: any) =>
              userLevelAndBadge.id === dummyData.postUserEmail
          )
          setUserLevelAndBadge(userLevelAndBadge)
        })
      })

      // 실시간 좋아요 숫자 업데이트
      onSnapshot(doc(db, "posts", id), (doc) => {
        setLikesCount(doc?.data()?.likes)
        setCommentsCount(doc?.data()?.comments)
      })

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
    }
  }, [])

  // 좋아요 버튼을 눌렀을 때 +/- 해주는 기능
  const clickLikeFn = () => {
    if (LikeBtnOne) {
      return
    }
    const email = auth.currentUser?.email

    findLikes(email, id).then((bool: boolean) => {
      if (bool) {
        setCheckLikeBtn(false)
        setLikes(true, email, id).then(() => {
          setLikeBtnOne(false)
        })
      } else {
        setCheckLikeBtn(true)
        setLikes(false, email, id).then(() => {
          setLikeBtnOne(false)
        })
      }
    })
  }

  const editBtn = () => {
    if (auth.currentUser?.email === postInfo?.postUserEmail) {
      navigate(`/EditdetailPage/${postInfo?.id}`)
    } else {
      alert("작성자가 아닙니다.")
    }
  }

  const deleteBtn = async () => {
    if (postInfo == null) {
      return // postInfo가 null 또는 undefined일 때 함수 종료
    }

    if (
      Boolean(postInfo) &&
      auth.currentUser?.email === postInfo?.postUserEmail
    ) {
      const idRef = doc(db, "posts", postInfo.id)
      await deleteDoc(idRef)
      const qLikes = query(
        collection(db, "likes"),
        where("postId", "==", postInfo.id)
      )
      const querySnapshotLikes = await getDocs(qLikes)

      const docIds: string[] = []
      querySnapshotLikes.forEach((doc: DocumentSnapshot) => {
        docIds.push(doc.id)
      })
      docIds.map(async (docId) => {
        const idRef = doc(db, "likes", docId)
        await deleteDoc(idRef)
      })

      const qComments = query(
        collection(db, "comments"),
        where("postId", "==", postInfo.id)
      )
      const querySnapshotComments = await getDocs(qComments)

      const docIdsComments: string[] = []
      querySnapshotComments.forEach((doc: DocumentSnapshot) => {
        docIdsComments.push(doc.id)
      })
      docIdsComments.map(async (docId) => {
        const idRef = doc(db, "comments", docId)
        await deleteDoc(idRef)
      })

      navigate(-1)
    } else {
      alert("글 작성자가 아닙니다.")
    }
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
              <LikeBtn
                onClick={() => {
                  setLikeBtnOne(true)
                  clickLikeFn()
                }}
                disabled={LikeBtnOne}
              >
                {checkLikeBtn ? (
                  <AiFillLike size="30px" />
                ) : (
                  <AiOutlineLike size="30px" />
                )}
              </LikeBtn>
            </BtnBox>
          </Detailtitle>
          <DetailUser>
            <DetailUserName
              onClick={() => {
                navigate(`/OtherProfilePage/${postInfo?.postUserEmail}`)
              }}
            >
              <PostUserBadge
                src={userLevelAndBadge?.badgeImg}
                alt="badgeImage"
              />
              {postInfo?.postDisplayName}
            </DetailUserName>
            <DetailUserInfo>
              <div>
                <AiOutlineLike size="12px" />
                {likesCount}
              </div>
              <div>
                <FaRegComment size="12px" />
                {commentsCount}
              </div>
            </DetailUserInfo>
          </DetailUser>
          <DetailContent>
            <DetailContentBody>
              {postInfo?.postContent}
              <br />
              <br />
              <img
                src={postInfo?.postImgUrl}
                style={{ maxWidth: "100%", maxHeight: "200px" }} // 이미지 크기 조절 가능
              />
              <br />
              <br />
            </DetailContentBody>
          </DetailContent>
          <EditBox>
            <EditBtn onClick={editBtn}>수정</EditBtn>
            <DeleteBtn onClick={deleteBtn}>삭제</DeleteBtn>
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
  min-height: 32rem;
  gap: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: solid #dadada 1px;
  border-radius: 16px;
  background-color: #e0e0e0;
  padding-top: 20px;
  padding-bottom: 20px;
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
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`

const PostUserBadge = styled.img`
  width: 1rem;
  height: 1.3rem;
  object-fit: contain;
`

const DetailUserInfo = styled.div`
  font-size: 13px;
  color: #b5b5b5;
  display: flex;
  gap: 1rem;
  padding-right: 22px;
`
const DetailContent = styled.pre`
  width: 52rem;
  min-height: 19rem;
  border: solid #dadada 1px;
  border-radius: 7px;
  background-color: white;
  white-space: pre-wrap;
  word-break: break-all;
  overflow: auto;
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
