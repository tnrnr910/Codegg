import React from "react"
import { styled } from "styled-components"

function SearchResultPage() {
  return (
    <SearchWrap>
      <QnA>
        <HeadWrap>
          <div>질의응답</div>
          <div>검색결과 (3건)</div>
          <div>더보기</div>
        </HeadWrap>
        <div>글 목록~</div>
      </QnA>
      <Tip>
        <HeadWrap>
          <div>코딩 팁</div>
          <div>검색결과 (0건)</div>
          <div>더보기</div>
        </HeadWrap>
        <div>검색결과가 없습니다.</div>
      </Tip>
      <Together>
        <HeadWrap>
          <div>모임</div>
          <div>검색결과 (0건)</div>
          <div>더보기</div>
        </HeadWrap>
        <div>검색결과가 없습니다.</div>
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
