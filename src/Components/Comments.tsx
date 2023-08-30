import React from "react"
import { styled } from "styled-components"
import ProfilePicture from "../Components/ProfilePicture"
import { PiSiren } from "react-icons/pi"
import { AiOutlineLike } from "react-icons/ai"
import { FaRegComment } from "react-icons/fa"

function Comments() {
  return (
    <CommentContainer>
      <CommentHead>댓글</CommentHead>
      <CommentLists>
        <Comment>
          <CommentLeft>
            <ProfilePicture style={{ width: "2rem", height: "2rem" }} />
            <CommentContents>
              <div>
                <CommentWriter>작성자</CommentWriter>
                <CommentTime>00분 전</CommentTime>
              </div>
              <CommentText>댓글 내용</CommentText>
            </CommentContents>
          </CommentLeft>
          <CommentRight>
            <CommentEdit>
              <button>수정</button>
              <button>삭제</button>
            </CommentEdit>
            <CommentButtons>
              <button>
                <PiSiren size="20px" />
                신고
              </button>
              <button>
                <AiOutlineLike size="20px" />
                좋아요
              </button>
              <button>
                <FaRegComment size="18px" />
                답글
              </button>
            </CommentButtons>
          </CommentRight>
        </Comment>
      </CommentLists>
      <CommentWrite>
        <ProfilePicture style={{ width: "2rem", height: "2rem" }} />
        <CommentWriteInputBox>
          <input type="text" placeholder="댓글을 작성하면 pt가 지급됩니다." />
          <button>등록</button>
        </CommentWriteInputBox>
      </CommentWrite>
    </CommentContainer>
  )
}

export default Comments

const CommentContainer = styled.div`
  margin: 1rem 0;
  width: 58rem;
`

const CommentHead = styled.div`
  font-size: 1.4rem;
  padding: 2rem 1rem;
  border-bottom: solid #dadada 1px;
`

const CommentLists = styled.div`
  border-bottom: solid #dadada 1px;
  padding: 1rem 1rem;
`

const Comment = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CommentLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
`

const CommentContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 0.5rem;

  & > div:first-child {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.6rem;
  }
`

const CommentWriter = styled.div``

const CommentTime = styled.div`
  color: #787878;
`

const CommentText = styled.div``

const CommentRight = styled.div`
  color: #787878;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.8rem;
`

const CommentEdit = styled.div`
  & > button {
    all: unset;
    padding: 0 4px;
  }

  & > button:first-child {
    border-right: 1px solid #787878;
  }
`

const CommentButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.7rem;

  & > button {
    all: unset;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const CommentWrite = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0.5rem;
  margin-top: 1.6rem;
`

const CommentWriteInputBox = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.4rem;

  border: 1px solid #dadada;
  border-radius: 0.4rem;

  & > input {
    all: unset;
    width: 90%;
  }

  & > button {
    all: unset;
    color: #787878;
    font-weight: bold;
  }
`
