import React from "react"
import SideRanking from "../../Components/SideRanking"
import styled from "styled-components"

function QnAPage() {
  return (
    <>
      <StyledContainer>
        <SideRanking />
        <StyledBox>
          <div>질의응답</div>
          <div>공지사항</div>
          <div>글목록</div>
        </StyledBox>
      </StyledContainer>
    </>
  )
}

export default QnAPage

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
`

const StyledBox = styled.div`
  width: 952px;
  margin-top: 80px;
`
