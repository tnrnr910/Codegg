import React from "react"
import { styled } from "styled-components"

interface ButtonsProps {
  children: any
  onClick?: () => void
  style?: object
  disabled?: boolean
  // 다른 필요한 props도 여기에 추가할 수 있습니다.
}

function Buttons({ children, ...props }: ButtonsProps) {
  return <WriteBtn {...props}>{children}</WriteBtn>
}

export default Buttons

export function SigninSignupBtns({ children, ...props }: ButtonsProps) {
  return <SigninSignupBtn {...props}>{children}</SigninSignupBtn>
}

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

const SigninSignupBtn = styled.button`
  width: 100%;
  height: 3rem;

  background-color: #0c356a;
  color: #fff;
  font-weight: bold;
  font-size: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid #dadada;
  border-radius: 4px;
  gap: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #10468c;
    border: 2px solid #10468c;
  }
`
