import React from "react"
import { styled } from "styled-components"

function Comments() {
  return (
    <CommentContainer>
      <CommentHead>댓글</CommentHead>
      <Commentdoby>댓글컴포넌트</Commentdoby>
    </CommentContainer>
  )
}

export default Comments

const CommentContainer = styled.div`
  padding-top: 48px;
`

const CommentHead = styled.div`
  width: 58rem;
  height: 2rem;
  font-size: 22px;
  border-bottom: solid #dadada 1px;
`

const Commentdoby = styled.div`
  width: 58rem;
  border-bottom: solid #dadada 1px;
`
