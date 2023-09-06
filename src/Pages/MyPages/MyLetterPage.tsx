import React from "react"
import MyPageMenuBar from "../../Components/MyPageMenuBar"
import styled from "styled-components"

function MyLetterPage() {
  const activeMenuItem = "/MyLetterPage"

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
            <SendButton>쪽지 보내기</SendButton>
          </Buttons>
        </div>
      </StyledContainer>
    </MyPostWrap>
  )
}

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
