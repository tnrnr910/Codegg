import React, { useState } from "react"
import { styled } from "styled-components"
import { useQuery } from "react-query"
import { useParams, useNavigate } from "react-router"
import { getPosts } from "../axios/api"
import Comments from "../Components/Comments"
import { auth, db } from "../axios/firebase"
import { doc, updateDoc } from "firebase/firestore"

function EditDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isLoading, data } = useQuery("posts", getPosts)
  const postInfo: any = data?.find((item) => item.id === id)
  const [item, setItem] = useState({
    postBoard: postInfo.postBoard,
    postCategory: postInfo.postCategory,
    postContent: postInfo.postContent,
    postDisplayName: postInfo.postDisplayName,
    postImgUrl: postInfo.postImgUrl,
    postTime: postInfo.postTime,
    postTitle: postInfo.postTitle,
    postUserEmail: postInfo.postUserEmail
  })

  const onChange = (event: { target: { value: string; name: string } }) => {
    const { value, name } = event.target
    setItem({
      ...item,
      [name]: value
    })
  }

  const handleEdit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    if (item.postTitle === null || item.postContent === null) {
      alert("빈칸을 채워주세요!")
      return
    }
    const newInfo = {
      postBoard: item.postBoard !== undefined ? item.postBoard : null,
      postCategory: item.postCategory !== undefined ? item.postCategory : null,
      postContent: item.postContent !== undefined ? item.postContent : null,
      postDisplayName: auth.currentUser?.displayName,
      postImgUrl: item.postImgUrl !== undefined ? item.postImgUrl : null,
      postTime: item.postTime !== undefined ? item.postTime : null,
      postTitle: item.postTitle !== undefined ? item.postTitle : null,
      postUserEmail: auth.currentUser?.email
    }
    const infoRef = doc(db, "posts", postInfo.id)
    void updateDoc(infoRef, newInfo)
    alert("저장되었습니다!")
    navigate(`/detailPage/${id}`)
  }
  if (isLoading) {
    return <div>로딩중 ...</div>
  }

  return (
    <>
      <Container>
        <DetailContainer>
          <Detailtitle>
            <DetailtitleBox>
              <DetailCategory>{postInfo.postCategory}</DetailCategory>
              <InputDetailTitle
                type="text"
                name="postTitle"
                placeholder="제목"
                value={item.postTitle}
                onChange={onChange}
              />
            </DetailtitleBox>
            <BtnBox>
              <DeclarationBtn>신고</DeclarationBtn>
              <LikeBtn>좋아요</LikeBtn>
            </BtnBox>
          </Detailtitle>
          <DetailUser>
            <DetailUserName>{postInfo.displayName}</DetailUserName>
            <DetailUserInfo>
              <div>좋아요</div>
              <div>댓글수</div>
            </DetailUserInfo>
          </DetailUser>
          <DetailContent>
            <InputDetailContent
              name="postContent"
              placeholder="내용을 입력해주세요"
              value={item.postContent}
              onChange={onChange}
            />
          </DetailContent>
          <EditBox>
            <EditBtn onClick={handleEdit} id={postInfo.id}>
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
