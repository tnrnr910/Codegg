import React, { useState } from "react"
import MyPageMenuBar from "../../Components/MyPageMenuBar"
import styled from "styled-components"

function MyLetterPage() {
  const activeMenuItem = "/MyLetterPage"

  const [isModalOpen, setModalOpen] = useState(false)

  // 받는 사람 및 쪽지 내용 입력값 상태 관리
  const [recipient, setRecipient] = useState("")
  const [message, setMessage] = useState("")

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const sendMessage = () => {
    // 메시지 전송 로직
    closeModal()
  }

  return (
    <MyPostWrap>
      <MyPageMenuBar activeMenuItem={activeMenuItem} />
      <StyledContainer>
        <StyledTitle>쪽지함</StyledTitle>
        <StyledTabButtons>
          <StyledButton>받은 쪽지</StyledButton>
          <StyledButton>보낸 쪽지</StyledButton>
        </StyledTabButtons>
        <NumberAndSearchBox>
          <NumberBox>
            전체<StyledNumberBlue>0</StyledNumberBlue>개
          </NumberBox>
        </NumberAndSearchBox>
        <StyledPostTitleBox>
          <LeftContainer>
            <StyledPostCategory>ㅁ</StyledPostCategory>
            <StyledPostTitleCategory>보낸 사람</StyledPostTitleCategory>
            <LetterContent>내용</LetterContent>
          </LeftContainer>
          <RightContainer>
            <Day>작성 일자</Day>
            <div>읽음 상태 </div>
          </RightContainer>
        </StyledPostTitleBox>
        <div>
          <StyledPost>
            <LeftContainer>
              <StyledPostCategory>ㅁ</StyledPostCategory>
              <Sender>홍길동</Sender>
              <LetterContent>쪽지 내용</LetterContent>
            </LeftContainer>
            <RightContainer>
              <Day>작성 일자</Day>
              <div>읽음 상태</div>
            </RightContainer>
          </StyledPost>
          <StyledPost>
            <LeftContainer>
              <StyledPostCategory>ㅁ</StyledPostCategory>
              <Sender>홍길동</Sender>
              <LetterContent>쪽지 내용</LetterContent>
            </LeftContainer>
            <RightContainer>
              <Day>작성 일자</Day>
              <div>읽음 상태</div>
            </RightContainer>
          </StyledPost>
          <Buttons>
            <DelButton>삭제</DelButton>
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

// 프로필 수정 시 사진 빈 값이면 기본이미지로 나오도록 변경 필요

// 마이페이지에서 팔로워, 팔로우, 내가쓴글 가져오기

// 쪽지 보내기 기능 만들기

export default MyLetterPage

const MyPostWrap = styled.div`
  display: flex;
  margin-top: 6.875rem;
  justify-content: center;
`
const StyledContainer = styled.div`
  padding: 1.25rem;
  width: 66rem;
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
  margin-left: 5px;
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
