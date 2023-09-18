import React from "react"
import { styled } from "styled-components"
import { useSelector } from "react-redux"
import { formatDate } from "../../Components/DateChange"
import { useNavigate } from "react-router"

interface RootState {
  search: {
    searchResults: any[]
  }
}

function SearchResultPage() {
  const navigate = useNavigate()
  const searchResults = useSelector(
    (state: RootState) => state.search.searchResults
  )
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
          <div
            onClick={() => {
              navigate("/QnAPage")
            }}
          >
            더보기
          </div>
        </HeadWrap>
        <div>
          {searchResults
            .filter((result) => result.postBoard === "questions")
            .map((result, index) => (
              <div key={index}>
                <ResultWrap>
                  <LeftContainer
                    onClick={() => {
                      navigate(`/detailPage/${result.id}`)
                    }}
                  >
                    <CategoryTitle>{result.postCategory}</CategoryTitle>
                    <PostTitle>{result.postTitle}</PostTitle>
                  </LeftContainer>
                  <RightContainer>
                    <NickName>{result.postDisplayName}</NickName>
                    <Time>{formatDate(result.postTime)}</Time>
                    <Likes>{result.likes}</Likes>
                    <Comments>{result.comments}</Comments>
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
          <div
            onClick={() => {
              navigate("/TipPage")
            }}
          >
            더보기
          </div>
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
                    <div>{formatDate(result.postTime)}</div>
                    <Likes>{result.likes}</Likes>
                    <Comments>{result.comments}</Comments>
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
          <div
            onClick={() => {
              navigate("/TogetherPage")
            }}
          >
            더보기
          </div>
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
                    <div>{formatDate(result.postTime)}</div>
                    <Likes>{result.likes}</Likes>
                    <Comments>{result.comments}</Comments>
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
  div:last-child {
    cursor: pointer;
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
  flex: 2;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`

const RightContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const CategoryTitle = styled.div`
  font-weight: bold;
  color: #9f9f9f;
  border: 1px solid #e7e7e7;
  padding: 3px;
  width: 45px;
  display: flex;
  justify-content: center;
`

const PostTitle = styled.div`
  width: 420px;
  justify-content: left;
  color: #333333;
`
const NickName = styled.div`
  flex: 2;
`

const Time = styled.div`
  flex: 2;
`

const Likes = styled.div`
  flex: 1;
`

const Comments = styled.div`
  flex: 1;
`
