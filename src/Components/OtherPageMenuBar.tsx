import React from "react"
import { styled } from "styled-components"
import { useNavigate, useParams } from "react-router"

interface MenuItemProps {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}
interface OtherPageMenuBarProps {
  activeMenuItem: string
}

function OtherPageMenuBar({ activeMenuItem }: OtherPageMenuBarProps) {
  const { email } = useParams()
  const { displayName } = useParams()
  const navigate = useNavigate()
  const handleMenuItemClick = (path: string) => {
    navigate(path)
  }

  return (
    <MenuBarWrap>
      <MyPageHead>{displayName}님 페이지</MyPageHead>
      <MenuItem
        active={activeMenuItem === `/OtherProfilePage/${email}/${displayName}`}
        onClick={() => {
          handleMenuItemClick(`/OtherProfilePage/${email}/${displayName}`)
        }}
      >
        {displayName}님 프로필
      </MenuItem>
      <MenuItem
        active={activeMenuItem === "/MyPostPage"}
        onClick={() => {
          handleMenuItemClick("/MyPostPage")
        }}
      >
        {displayName}님이 쓴 글
      </MenuItem>
    </MenuBarWrap>
  )
}

export default OtherPageMenuBar

const MenuBarWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 18.625rem;
  margin-right: 0.4rem;
  margin-top: 1.875rem;
  width: 9.8125rem;
  border-right: solid 1px #dadada;
`
const MyPageHead = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 2.625rem;
  width: 100%;
  margin-top: 3.5625rem;
`
const MenuItem = styled.div<MenuItemProps>`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 1rem;
  width: 95.4%;
  height: 2.125rem;
  margin-bottom: 1.5rem;
  background-color: ${(props) => (props.active ? "#0C356A" : "transparent")};
  color: ${(props) => (props.active ? "#FFF" : "inherit")};
  font-weight: ${(props) => (props.active ? "bold" : "inherit")};
  padding: 0.25rem;
  border-radius: 0.25rem;
`
