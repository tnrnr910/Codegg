import React from "react"
import styled from "styled-components"

function SideRanking() {
  return (
    <>
      <RankedBox>
        <RankedTitle>Top Writers</RankedTitle>
        <div></div>
      </RankedBox>
    </>
  )
}

const RankedBox = styled.div`
  width: 16rem;
  height: 17rem;
  border: solid #d9d9d9 1px;
  border-radius: Mixed;
  margin: 10rem 102px 48px;
  padding: 1.5rem 1.5rem 1.5rem 1.5rem;
`

const RankedTitle = styled.div`
  border-bottom: solid #d9d9d9 1px;
  font-size: 15px;
  font-weight: bold;
  padding-bottom: 14px;
`

export default SideRanking
