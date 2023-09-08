import React from "react"
import { styled } from "styled-components"
import { useSelector } from "react-redux"
import { formatDate } from "../../Components/DateChange"
interface RootState {
  searchResults: any[]
}

function SearchResultPage() {
  const searchResults = useSelector((state: RootState) => state.searchResults)
  return (
    <SearchWrap>
      <QnA>
        <HeadWrap>
          <div>질의응답</div>
          <div>
            검색결과 (
            {
              searchResults.filter((result) => result.postBoard === "questions")
                .length
            }
            건)
          </div>{" "}
          <div>더보기</div>
        </HeadWrap>
        <div>
          {searchResults
            .filter((result) => result.postBoard === "questions")
            .map((result, index) => (
              <div key={index}>
                <ResultWrap>
                  <LeftContainer>
                    <CategoryTitle>{result.postCategory}</CategoryTitle>
                    <PostTitle>{result.postTitle}</PostTitle>
                  </LeftContainer>
                  <RightContainer>
                    <NickName>{result.postDisplayName}</NickName>
                    <div>{formatDate(result.postTime.seconds)}</div>
                    <Likes>좋아요 수</Likes>
                    <div>댓글 수</div>
                  </RightContainer>
                </ResultWrap>
              </div>
            ))}
        </div>
      </QnA>
      <Tip>
        <HeadWrap>
          <div>코딩 팁</div>
          <div>
            검색결과 (
            {
              searchResults.filter((result) => result.postBoard === "tips")
                .length
            }
            건)
          </div>{" "}
          <div>더보기</div>
        </HeadWrap>
        <div>
          {searchResults
            .filter((result) => result.postBoard === "tips")
            .map((result, index) => (
              <div key={index}>
                <ResultWrap>
                  <LeftContainer>
                    <CategoryTitle>{result.postCategory}</CategoryTitle>
                    <PostTitle>{result.postTitle}</PostTitle>
                  </LeftContainer>
                  <RightContainer>
                    <NickName>{result.postDisplayName}</NickName>
                    <div>{formatDate(result.postTime.seconds)}</div>
                    <Likes>좋아요 수</Likes>
                    <div>댓글 수</div>
                  </RightContainer>
                </ResultWrap>
              </div>
            ))}
        </div>
      </Tip>
      <Together>
        <HeadWrap>
          <div>모임</div>
          <div>
            검색결과 (
            {
              searchResults.filter((result) => result.postBoard === "meetups")
                .length
            }
            건)
          </div>{" "}
          <div>더보기</div>
        </HeadWrap>
        <div>
          {searchResults
            .filter((result) => result.postBoard === "meetups")
            .map((result, index) => (
              <div key={index}>
                <ResultWrap>
                  <LeftContainer>
                    <CategoryTitle>{result.postCategory}</CategoryTitle>
                    <PostTitle>{result.postTitle}</PostTitle>
                  </LeftContainer>
                  <RightContainer>
                    <NickName>{result.postDisplayName}</NickName>
                    <div>{formatDate(result.postTime.seconds)}</div>
                    <Likes>좋아요 수</Likes>
                    <div>댓글 수</div>
                  </RightContainer>
                </ResultWrap>
              </div>
            ))}
        </div>
      </Together>
    </SearchWrap>
  )
}

export default SearchResultPage

const SearchWrap = styled.div`
  width: 57.875rem;
  display: flex;
  flex-direction: column;
`
const QnA = styled.div`
  margin-top: 5.25rem;
`
const Tip = styled.div`
  margin-top: 6.25rem;
`
const Together = styled.div`
  margin-top: 6.25rem;
`
const HeadWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3.875rem;
  border-bottom: 1px solid #d9d9d9;
  margin-bottom: 1.6875rem;

  div:nth-child(1) {
    font-size: 1.5rem;
    font-weight: bold;
  }
  div:nth-child(2) {
    margin-left: -39rem;
    color: #979797;
  }
  div:nth-child(2) {
    color: #3e3d42;
  }
`
const ResultWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
`

const LeftContainer = styled.div`
  flex: 1;
  display: flex;
`

const RightContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`
const Likes = styled.div`
  margin-left: 0.3125rem;
  margin-right: 0.3125rem;
`
const CategoryTitle = styled.div`
  font-weight: bold;
  color: #9f9f9f;
  border: 1px solid #ccc;
`

const PostTitle = styled.div`
  margin-left: 5px;
`
const NickName = styled.div`
  margin-right: 5px;
`
