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
            전체<StyledNumberBlue></StyledNumberBlue>개
          </NumberBox>
          <SelectAndSearchBox>
            <SearchWord>검색 &nbsp;</SearchWord>
            <SelectPageBox>
              <SelectPages>
                <StyledSearchContainer>
                  <StyledCategoryButton></StyledCategoryButton>
                </StyledSearchContainer>
              </SelectPages>
            </SelectPageBox>
            <SearchButton />
            <StyledSearchInput />
          </SelectAndSearchBox>
        </NumberAndSearchBox>
        <StyledPostTitleBox>
          <StyledPostTitleCategory>보낸 사람</StyledPostTitleCategory>
          <StyledPostTitlePostName>제목</StyledPostTitlePostName>
          <StyledPostTitlePostDay>작성일자 </StyledPostTitlePostDay>
          <StyledPostTitlePostLikes>읽음 상태 </StyledPostTitlePostLikes>
          <StyledPostTitlePostCommentNum>
            댓글 수{" "}
          </StyledPostTitlePostCommentNum>
        </StyledPostTitleBox>
        <StyledPostContainer>
          <StyledPostList>
            <StyledPost>
              <StyledPostCategory>ㅁ</StyledPostCategory>
              <div>홍길동</div>
              <div>쪽지 내용</div>
              <div>작성 일자</div>
              <div>읽음 상태</div>
            </StyledPost>
            <StyledPost>
              <StyledPostCategory>ㅁ</StyledPostCategory>
              <div>홍길동</div>
              <div>쪽지 내용</div>
              <div>작성 일자</div>
              <div>읽음 상태</div>
            </StyledPost>
          </StyledPostList>
        </StyledPostContainer>
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

const StyledSearchContainer = styled.span`
  display: inline;
  width: 8rem;
`

const StyledCategoryButton = styled.button`
  border: none;
  cursor: pointer;
  float: right;
  padding: 0px;
  padding-right: 10px;
  font-size: 0.875rem;
  background-color: white;
  width: auto;
`
const StyledSearchInput = styled.input`
  padding: 0.625rem;
  width: 20rem;
  height: 1rem;
  background-color: var(--color-line-gray-200);
  float: right;
  border-radius: 0.3125rem;
  border: 0.0625rem solid #dadada;
`

const SearchButton = styled.div`
  margin: 5px;
  float: right;
  background: styled(BiSearch);
  width: 30px;
  height: 30px;
  border: 0 solid white;
  color: #63717f;
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

const StyledPostContainer = styled.div`
  border: 0.0625rem solid #ccc;
  background-color: #f8f8f8;
  padding: 1.25rem;
  margin-bottom: 1.25rem;
`

const StyledPostList = styled.ul`
  list-style: none;
  padding: 0;
`

const StyledPost = styled.li`
  border: 0.0625rem solid #ccc;
  padding: 1.25rem;
  margin-bottom: 1.25rem;
  background-color: #f8f8f8;
`

const StyledPostCategory = styled.p`
  font-weight: bold;
  margin-bottom: 0.3125rem;
`

const StyledNumberBlue = styled.span`
  color: #0c356a;
  font-weight: bold;
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

const SelectAndSearchBox = styled.span`
  float: right;
  width: 37rem;
`

const SelectPageBox = styled.span`
  font-size: 0.875rem;
  margin-left: 5.2rem;
`

const SelectPages = styled.span`
  display: inline-block;
  border: 0.0625rem solid #dadada;
  padding: 0.625rem;
  width: 6rem;
  border-radius: 0.3125rem;
  font-size: 0.875rem;
  height: 1rem;
`

const StyledPostTitleBox = styled.div`
  width: 100%;
  text-align: right;
  height: 1.875rem;
  margin-top: 0.625rem;
  margin-bottom: 1.25rem;
  border-top: 0.0625rem solid #dadada;
  padding-top: 0.875rem;
  border-bottom: 0.0625rem solid #333333;
`

const StyledPostTitlePostName = styled.span`
  float: left;
  width: 31.25rem;
  text-align: center;
  font-size: 0.875rem;
`

const StyledPostTitlePostDay = styled.span`
  display: inline-block;
  width: 6.875rem;
  text-align: center;
  font-size: 0.875rem;
`

const StyledPostTitlePostLikes = styled.span`
  display: inline-block;
  width: 6.25rem;
  text-align: center;
  font-size: 0.875rem;
`

const StyledPostTitlePostCommentNum = styled.span`
  display: inline-block;
  width: 5.625rem;
  text-align: center;
  font-size: 0.875rem;
`

const StyledPostTitleCategory = styled.span`
  float: left;
  width: 5.625rem;
  text-align: center;
  font-size: 0.875rem;
`

const SearchWord = styled.span`
  position: absolute;
  margin-top: 12px;
  margin-left: 2.8rem;
  font-size: 0.875rem;
`
