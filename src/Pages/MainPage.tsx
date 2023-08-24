import React from "react"
import { styled } from "styled-components"

function MainPage() {
  return (<>
  <Baner>배너</Baner>
  <div>
  <div>
    <div>질의응답</div>
    <div>모임</div>
    <div>코딩 팁</div>
    <div>공지사항</div>
  </div>
    <div>Top ranked</div>
  </div>

  </>)
}

export default MainPage

const Baner = styled.div`
width: 100%;
height: 25rem;
border: solid #D9D9D9 1px;
`