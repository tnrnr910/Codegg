import React, { useState, useEffect } from "react"
import MyPageMenuBar from "../../Components/MyPageMenuBar"
import styled from "styled-components"
import { db, auth } from "../../axios/firebase"
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  writeBatch,
  doc
} from "firebase/firestore"
import { formatDate } from "../../Components/DateChange"
import { getusersinfos } from "../../axios/api"

interface Message {
  id: string
  sender: string
  recipient: string
  recipientEmail: string
  senderEmail: any
  content: string
  createdAt: number
  read: boolean
}

function MyLetterPage() {
  const activeMenuItem = "/MyLetterPage"
  const user = auth.currentUser
  const displayName = user?.displayName

  const [receivedMessages, setReceivedMessages] = useState<Message[]>([])
  const [recipient, setRecipient] = useState("")
  const [message, setMessage] = useState("")
  const [recipientEmail, setRecipientEmail] = useState("")

  const [messageType, setMessageType] = useState<"received" | "sent">(
    "received"
  )
  const handleTabClick = (type: "received" | "sent") => {
    setMessageType(type)
  }

  const [selectedMessages, setSelectedMessages] = useState<string[]>([])
  const handleCheckboxChange = (messageId: string) => {
    if (selectedMessages.includes(messageId)) {
      setSelectedMessages((prevState) =>
        prevState.filter((id) => id !== messageId)
      )
    } else {
      setSelectedMessages((prevState) => [...prevState, messageId])
    }
  }
  const deleteSelectedMessages = async () => {
    if (selectedMessages.length === 0) {
      return
    }

    const batch = writeBatch(db)

    selectedMessages.forEach((messageId) => {
      const messageRef = doc(db, "messages", messageId)
      batch.delete(messageRef)
    })

    try {
      await batch.commit()
      setSelectedMessages([])
      await fetchMessages()
    } catch (error) {
      console.error("쪽지 삭제 중 오류 발생:", error)
    }
  }

  const [isModalOpen, setModalOpen] = useState(false)
  const openModal = () => {
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }

  const sendMessage = () => {
    addDoc(collection(db, "messages"), {
      sender: displayName,
      recipient,
      recipientEmail,
      senderEmail: user?.email,
      content: message,
      createdAt: new Date().getTime(),
      read: false
    })
      .then(() => {
        closeModal()
      })
      .catch((error: any) => {
        console.error("메시지 저장 중 오류 발생:", error)
      })
  }

  const fetchMessages = async () => {
    let q

    if (messageType === "received") {
      q = query(
        collection(db, "messages"),
        where("recipientEmail", "==", user?.email)
      )
    } else if (messageType === "sent") {
      q = query(
        collection(db, "messages"),
        where("senderEmail", "==", user?.email)
      )
    }

    try {
      if (q != null) {
        const querySnapshot = await getDocs(q)
        const messages: Message[] = []

        querySnapshot.forEach((doc) => {
          const data = doc.data()
          messages.push({
            id: doc.id,
            sender: data.sender as string,
            recipient: data.recipient as string,
            recipientEmail: data.recipient as string,
            senderEmail: user?.email,
            content: data.content as string,
            createdAt: data.createdAt as number,
            read: data.read as boolean
          })
        })
        setReceivedMessages(messages)
      }
    } catch (error) {
      console.error("쪽지 가져오기 중 오류 발생:", error)
    }
  }

  useEffect(() => {
    void fetchMessages()

    if (recipient.length > 0) {
      getusersinfos().then((users: any[]) => {
        const recipientUser = users.find(
          (user) => user.displayName === recipient
        )
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (recipientUser) {
          setRecipientEmail(recipientUser.email)
        } else {
          console.error("받는 사람을 찾을 수 없습니다.")
        }
      })
    }
  }, [messageType, recipient])

  return (
    <MyPostWrap>
      <MyPageMenuBar activeMenuItem={activeMenuItem} />
      <StyledContainer>
        <StyledTitle>쪽지함</StyledTitle>
        <StyledTabButtons>
          <StyledButton
            onClick={() => {
              handleTabClick("received")
            }}
            className={messageType === "received" ? "active" : ""}
          >
            받은 쪽지
          </StyledButton>
          <StyledButton
            onClick={() => {
              handleTabClick("sent")
            }}
            className={messageType === "sent" ? "active" : ""}
          >
            보낸 쪽지
          </StyledButton>
        </StyledTabButtons>
        <NumberAndSearchBox>
          <NumberBox>
            전체<StyledNumberBlue>0</StyledNumberBlue>개
          </NumberBox>
        </NumberAndSearchBox>
        <StyledPostTitleBox>
          <LeftContainer>
            <StyledPostCategory>ㅁ</StyledPostCategory>
            <StyledPostTitleCategory>송/수신인</StyledPostTitleCategory>
            <LetterContent>내용</LetterContent>
          </LeftContainer>
          <RightContainer>
            <Day>작성 일자</Day>
            <div>읽음 상태 </div>
          </RightContainer>
        </StyledPostTitleBox>
        <div>
          {receivedMessages.map((message) => (
            <StyledPost key={message.id}>
              <LeftContainer>
                <input
                  className="your-checkbox-class"
                  type="checkbox"
                  checked={selectedMessages.includes(message.id)}
                  onChange={() => {
                    handleCheckboxChange(message.id)
                  }}
                />
                <Sender>{message.sender}</Sender>
                <LetterContent>{message.content}</LetterContent>
              </LeftContainer>
              <RightContainer>
                <Day>{formatDate(message.createdAt)}</Day>
                <div>{message.read ? "읽음" : "안 읽음"}</div>
              </RightContainer>
            </StyledPost>
          ))}
          <Buttons>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <DelButton onClick={deleteSelectedMessages}>삭제</DelButton>
            <SendButton onClick={openModal}>쪽지 보내기</SendButton>
            {isModalOpen && (
              <ModalOverlay>
                <ModalContainer>
                  <ModalHeader>
                    <ModalTitle>쪽지 보내기</ModalTitle>
                    <CloseButton onClick={closeModal}>X</CloseButton>
                  </ModalHeader>
                  <ModalContent>
                    <Input
                      type="text"
                      placeholder="받는 사람을 검색해보세요."
                      value={recipient}
                      onChange={(e) => {
                        setRecipient(e.target.value)
                      }}
                    />
                    <Textarea
                      placeholder="내용을 입력하세요"
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value)
                      }}
                    />
                    <SendButton onClick={sendMessage}>보내기</SendButton>
                  </ModalContent>
                </ModalContainer>
              </ModalOverlay>
            )}
          </Buttons>
        </div>
      </StyledContainer>
    </MyPostWrap>
  )
}

export default MyLetterPage

const MyPostWrap = styled.div`
  display: flex;
  margin-top: 2rem;
  justify-content: center;
`
const StyledContainer = styled.div`
  padding: 1.25rem;
  width: 66rem;
  height: 780px;
`
const StyledTitle = styled.div`
  margin-bottom: 3.125rem;
  font-size: 1.5625rem;
  font-weight: bold;
`
const StyledTabButtons = styled.div`
  background-color: #f4f4f4;
  height: 3.125rem;
  display: flex;
  border: 0.0625rem solid #dadada;
  margin-bottom: 1.25rem;
  border-radius: 0.625rem 0.625rem 0 0;
`
const StyledButton = styled.button`
  border-radius: ${(props) =>
    props.children === "질의응답" ? "0.5625rem 0 0 0" : ""};
  background-color: ${(props) =>
    props.className === "active" ? "#fff" : "transparent"};
  border-style: solid;
  border-color: #dadada;
  border-width: 0 0.0625rem 0 0;
  padding: 0.625rem 1.25rem;
  height: ${(props) => (props.className === "active" ? "3.1875rem" : "")};
  cursor: pointer;
  color: #333;
  font-weight: ${(props) => (props.className === "active" ? "bold" : "normal")};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.className === "active" ? "#f0f0f0" : "#e0e0e0"};
  }
`
const StyledPost = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
`
const StyledPostCategory = styled.div`
  font-weight: bold;
  margin-bottom: 0.3125rem;
`
const StyledNumberBlue = styled.span`
  color: #0c356a;
  font-weight: bold;
  margin-left: 5px;
`
const NumberAndSearchBox = styled.div`
  position: relative;
  height: 3.75rem;
  width: 100%;
`
const NumberBox = styled.span`
  position: absolute;
  margin-top: 0.8125rem;
  margin-left: 1.25rem;
`
const StyledPostTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border-bottom: 0.0625rem solid #333333;
  border-top: 0.0625rem solid #dadada;
`
const StyledPostTitleCategory = styled.span`
  float: left;
  width: 5.625rem;
  text-align: center;
  font-size: 0.875rem;
`
const LeftContainer = styled.div`
  flex: 1;
  display: flex;
`
const Sender = styled.div`
  margin-left: 5px;
`
const LetterContent = styled.div`
  margin-left: 7.3125rem;
`
const RightContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`
const Day = styled.div`
  margin-right: 0.3125rem;
`
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
`
const DelButton = styled.button`
  width: 4rem;
  height: 2rem;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  cursor: pointer;
  font-weight: bold;
`
const SendButton = styled.button`
  width: 6rem;
  height: 2rem;
  background-color: #0c356a;
  border: 1px solid #000;
  cursor: pointer;
  font-weight: bold;
  color: #fff;
`
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
  z-index: 100;
`
const ModalContainer = styled.div`
  background: white;
  width: 32.875rem;
  height: 38.125rem;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`
const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0c356a;
  height: 3.9375rem;
  padding: 10px;
  border-radius: 10px 10px 0 0;
  color: white;
`
const ModalTitle = styled.h2`
  font-weight: bold;
  margin-left: 10px;
`
const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: white;
`
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding: 5px;
`
const Input = styled.input`
  width: 29.875rem;
  padding: 10px;
  margin-bottom: 10px;
`
const Textarea = styled.textarea`
  width: 29.875rem;
  height: 23.4375rem;
  padding: 10px;
  margin-bottom: 10px;
`
