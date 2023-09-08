import React from "react"
import { styled } from "styled-components"

interface ButtonsProps {
  children: any
  onClick: () => void
  // 다른 필요한 props도 여기에 추가할 수 있습니다.
}

function Buttons({ children, ...props }: ButtonsProps) {
  return <WriteBtn {...props}>{children}</WriteBtn>
}

export default Buttons

const WriteBtn = styled.button`
  font-size: 14px;
  font-weight: bold;
  width: 64px;
  height: 28px;
  border-radius: 4px;
  margin: 7px 12px 12px 7px;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: #0c356a;
  cursor: pointer;
`
