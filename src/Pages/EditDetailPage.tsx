import React, { useEffect, useState } from "react"
import { styled } from "styled-components"
import { useParams, useNavigate } from "react-router"
import { getPost } from "../axios/api"
import Comments from "../Components/Comments"
import { auth, db } from "../axios/firebase"
import { doc, onSnapshot, updateDoc } from "firebase/firestore"
import { AiOutlineLike } from "react-icons/ai"
import { FaRegComment } from "react-icons/fa"
import { PiSiren } from "react-icons/pi"

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
  postSkin: string
  likes: number
  comments: number
}

function EditDetailPage() {
  const { id } = useParams<string>()
  const navigate = useNavigate()
  const [postInfo, setPostInfo] = useState<Post>({
    id: "",
    postBoard: "",
    postCategory: "",
    postContent: "",
    postDisplayName: "",
    postImgUrl: "",
    postTitle: "",
    postTime: 0,
    postUserEmail: "",
    postSkin: "",
    likes: 0,
    comments: 0
  })
  const [likesCount, setLikesCount] = useState(0)
  const [commentsCount, setCommentsCount] = useState(0)

  // post 정보를 하나만 가져오기
  useEffect(() => {
    if (id !== undefined) {
      void getPost(id).then((dummyData: any) => {
        setPostInfo(dummyData)

        if (postInfo !== undefined) {
          setLikesCount(postInfo.likes)
          setCommentsCount(postInfo.comments)
        }
      })
      // 실시간 좋아요 숫자 업데이트
      onSnapshot(doc(db, "posts", id), (doc) => {
        setLikesCount(doc?.data()?.likes)
        setCommentsCount(doc?.data()?.comments)
      })
    }
  }, [])

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setPostInfo((prevPostInfo) => {
      return {
        ...prevPostInfo,
        [name]: value
      }
    })
  }

  const handleEdit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    if (postInfo?.postTitle === null || postInfo?.postContent === null) {
      alert("빈칸을 채워주세요!")
      return
    }
    const newInfo = {
      postBoard: postInfo?.postBoard ?? null,
      postCategory: postInfo?.postCategory ?? null,
      postContent: postInfo?.postContent ?? null,
      postDisplayName: auth.currentUser?.displayName,
      postImgUrl: postInfo?.postImgUrl ?? null,
      postTime: postInfo?.postTime ?? null,
      postTitle: postInfo?.postTitle ?? null,
      postUserEmail: auth.currentUser?.email
    }

    if (postInfo?.id !== undefined) {
      const infoRef = doc(db, "posts", postInfo.id)
      void updateDoc(infoRef, newInfo)
      alert("저장되었습니다!")
      navigate(`/detailPage/${id}`)
    }
  }

  return (
    <>
      <Container>
        <DetailContainer>
          <Detailtitle>
            <DetailtitleBox>
              <DetailCategory>{postInfo?.postCategory}</DetailCategory>
              <InputDetailTitle
                type="text"
                name="postTitle"
                placeholder="제목"
                value={postInfo?.postTitle}
                onChange={onChange}
              />
            </DetailtitleBox>
            <BtnBox>
              <DeclarationBtn>
                <PiSiren size="30px" />
              </DeclarationBtn>
              <LikeBtn>
                <AiOutlineLike size="30px" />
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
                {commentsCount}
              </div>
            </DetailUserInfo>
          </DetailUser>
          <DetailContent>
            <InputDetailContent
              name="postContent"
              placeholder="내용을 입력해주세요"
              value={postInfo?.postContent}
              onChange={onChange}
            />
          </DetailContent>
          <EditBox>
            <EditBtn onClick={handleEdit} id={postInfo?.id}>
              저장
            </EditBtn>
            <DeleteBtn
              onClick={() => {
                navigate(-1)
              }}
            >
              취소
            </DeleteBtn>
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

export default EditDetailPage

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
const InputDetailContent = styled.input`
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

const InputDetailTitle = styled.input`
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
