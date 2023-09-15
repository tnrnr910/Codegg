import React from "react"
import { styled } from "styled-components"
import { useNavigate } from "react-router"

interface MenuItemProps {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}
interface MyPageMenuBarProps {
  activeMenuItem: string
}

function AdminMenuBar({ activeMenuItem }: MyPageMenuBarProps) {
  const navigate = useNavigate()
  const handleMenuItemClick = (path: string) => {
    navigate(path)
  }

  return (
    <MenuBarWrap>
      <MyPageHead>마이페이지</MyPageHead>
      <MenuItem
        active={activeMenuItem === "/MyProfilePage"}
        onClick={() => {
          handleMenuItemClick("/MyProfilePage")
        }}
      >
        프로필 관리
      </MenuItem>
      <MenuItem
        active={activeMenuItem === "/MyPostPage"}
        onClick={() => {
          handleMenuItemClick("/MyPostPage")
        }}
      >
        내가 쓴 글
      </MenuItem>
      <MenuItem
        active={activeMenuItem === "/MyLikePage"}
        onClick={() => {
          handleMenuItemClick("/MyLikePage")
        }}
      >
        좋아요 한 게시물
      </MenuItem>
      <MenuItem
        active={activeMenuItem === "/FollowPage"}
        onClick={() => {
          handleMenuItemClick("/FollowPage")
        }}
      >
        팔로우/팔로워
      </MenuItem>
      <MenuItem
        active={activeMenuItem === "/MyLetterPage"}
        onClick={() => {
          handleMenuItemClick("/MyLetterPage")
        }}
      >
        쪽지함
      </MenuItem>
    </MenuBarWrap>
  )
}

export default AdminMenuBar

const MenuBarWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10rem;
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
