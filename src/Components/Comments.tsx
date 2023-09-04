import React, { useEffect, useState } from "react"
import { styled } from "styled-components"
import ProfilePicture from "../Components/ProfilePicture"
import moment from "moment"
import "moment/locale/ko"
// import { PiSiren, PiArrowBendDownRightBold } from "react-icons/pi"
import { PiSiren } from "react-icons/pi"
import { AiOutlineLike } from "react-icons/ai"
import { FaRegComment } from "react-icons/fa"
import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { getPosts } from "../axios/api"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy
} from "firebase/firestore"
import { db, auth } from "../axios/firebase"
import Swal from "sweetalert2"

interface CommentInterface {
  commentContent: string | undefined
  commentTime: any
  commentUserEmail: string | null | undefined
  commentUserProfileImg: string | null | undefined
  commentUserDisplayName: string | null | undefined
  isSecret: boolean
  postId: string | undefined
  postUserEmail: string | undefined
  postUserDisplayName: string | undefined
  id?: string
}

function Comments() {
  const { id } = useParams()

  const { isLoading, data } = useQuery("posts", getPosts)

  const postData = data?.find(function (data) {
    return data.id === id
  })

  if (isLoading) {
    return <div>로딩중입니다..</div>
  }

  const [inputText, setInputText] = useState("")
  const [commentsData, setCommentsData] = useState<CommentInterface[]>([])
  // const date = new Date(commentsData.commentTime*1000)

  // 댓글 가져오는 함수
  const fetchComments = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, "comments"), orderBy("commentTime"))
    )

    const initialComments: CommentInterface[] = []

    querySnapshot.forEach((doc) => {
      // eslint-disable-next-line @typescript-eslint/no-base-to-string, @typescript-eslint/restrict-template-expressions
      console.log(`1${doc.id} => ${doc.data()}`)
      if (id !== undefined) {
        const commentData: CommentInterface = {
          commentContent: doc.data().commentContent,
          commentTime: doc.data().commentTime,
          commentUserEmail: doc.data().commentUserEmail,
          commentUserProfileImg: doc.data().commentUserProfileImg,
          commentUserDisplayName: doc.data().commentUserDisplayName,
          isSecret: doc.data().isSecret,
          postId: doc.data().postId,
          postUserEmail: doc.data().postUserEmail,
          postUserDisplayName: doc.data().postUserDisplayName,
          id: doc.id
        }
        initialComments.push(commentData)
        setCommentsData([...initialComments])
      }
    })
  }

  // 댓글 인풋값을 inputText로 샛함
  const onInputChange = (event: { target: { name: any; value: any } }) => {
    const {
      target: { name, value }
    } = event
    if (name === "inputText") {
      setInputText(value)
    }
    console.log(inputText)
  }

  // 댓글 조회
  useEffect(() => {
    void fetchComments()
  }, [])

  // 댓글 등록
  async function addComment(event: any) {
    event.preventDefault()
    const newComment = {
      commentContent: inputText,
      commentTime: moment().format("MMMM Do YYYY, h:mm:ss a"),
      commentUserEmail: auth.currentUser?.email,
      commentUserProfileImg: auth.currentUser?.photoURL,
      commentUserDisplayName: auth.currentUser?.displayName,
      isSecret: false,
      postId: id,
      postUserEmail: postData?.postUserEmail,
      postUserDisplayName: postData?.postDisplayName
    }

    setInputText("")

    await addDoc(collection(db, "comments"), newComment) // await가 batching처리 방해
    await fetchComments()
  }

  // 댓글 삭제
  const deleteComment = async (id: string) => {
    await Swal.fire({
      title: "정말로 삭제하시겠습니까?",
      text: "삭제된 댓글은 복원할 수 없습니다.",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소"
    }).then((result) => {
      if (result.isConfirmed) {
        void deleteDoc(doc(db, "comments", id))
        void Swal.fire("삭제 완료", "정상적으로 삭제되었습니다.")
        setCommentsData((prev) => {
          return prev.filter((element) => element.id !== id)
        })
      }
    })
  }

  return (
    <CommentContainer>
      <CommentHead>댓글</CommentHead>
      <CommentLists>
        {/* 댓글 영역 */}
        {commentsData
          .filter((item) => item.postId === id?.toString())
          .map((commentItem) => {
            return (
              <React.Fragment key={commentItem.id}>
                <Comment>
                  <CommentLeft>
                    <ProfilePicture style={{ width: "2rem", height: "2rem" }} />
                    <CommentContents>
                      <div>
                        <CommentWriter>
                          {commentItem.commentUserDisplayName}
                        </CommentWriter>
                        <CommentTime>{commentItem.commentTime}</CommentTime>
                      </div>
                      <CommentText>{commentItem.commentContent}</CommentText>
                    </CommentContents>
                  </CommentLeft>
                  <CommentRight>
                    {auth.currentUser?.email ===
                    commentItem?.commentUserEmail ? (
                      <CommentEdit>
                        <button>수정</button>
                        <button
                          // eslint-disable-next-line @typescript-eslint/no-misused-promises
                          onClick={async () => {
                            if (commentItem.id !== undefined) {
                              await deleteComment(commentItem.id)
                            }
                          }}
                        >
                          삭제
                        </button>
                      </CommentEdit>
                    ) : null}
                    {auth.currentUser?.email ===
                    commentItem?.commentUserEmail ? (
                      <CommentButtons>
                        <button>
                          <FaRegComment size="18px" />
                          답글
                        </button>
                      </CommentButtons>
                    ) : (
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
                    )}
                  </CommentRight>
                </Comment>
                {/* 대댓글 영역
                <ReplyComment>
                  <CommentLeft style={{ width: "55%", marginLeft: "1rem" }}>
                    <PiArrowBendDownRightBold
                      style={{ color: "#787878" }}
                      size="1.5rem"
                    />
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
                </ReplyComment> */}
              </React.Fragment>
            )
          })}
      </CommentLists>
      {auth.currentUser != null ? (
        <CommentWrite>
          <ProfilePicture style={{ width: "2rem", height: "2rem" }} />
          <CommentWriteInputForm>
            <input
              type="text"
              value={inputText}
              name="inputText"
              onChange={onInputChange}
              placeholder="댓글을 작성하면 pt가 지급됩니다."
              required
            />
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <button onClick={addComment}>등록</button>
          </CommentWriteInputForm>
        </CommentWrite>
      ) : null}
    </CommentContainer>
  )
}

// TODO: 노멀 업데이트 : 1. 서버 > 2. 다시 그려주기 >>> 너무 느리면 로딩바 or 옵티미스틱 업데이트로 수정하기(둘 중 필요한 부분에만)
// useMutation 함수 : addDoc이 성공하면 > 현재 db 불러오기(usequery)
// 옵티미스틱 업데이트 > 좋아요, 팔로워 등에 권장

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
  padding: 1rem 1rem;
`

const Comment = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid #dadada 1px;
  padding: 1rem 0;
`

// 대댓글 영역
// const ReplyComment = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-top: 1rem;
// `

const CommentLeft = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 0.8rem;
  width: 60%;
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
    cursor: pointer;
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
    gap: 1px;
  }
`

const CommentWrite = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0.5rem;
  margin-top: 1.6rem;
`

const CommentWriteInputForm = styled.form`
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
