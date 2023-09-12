import React, { useEffect, useState } from "react"
import { styled } from "styled-components"
import { useNavigate, useParams } from "react-router"
import { getusersinfo } from "../axios/api"

interface MenuItemProps {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}
interface OtherPageMenuBarProps {
  activeMenuItem: string
}

interface UserData {
  id: string
  badgeImg: string
  displayName: string
  email: string
  isAdmin: string
  profileImg: string
  follower: number
  following: number
}

function OtherPageMenuBar({ activeMenuItem }: OtherPageMenuBarProps) {
  const { email } = useParams()
  const navigate = useNavigate()
  const [userstInfo, setuserstInfo] = useState<UserData>()
  const userEmail = email

  const handleMenuItemClick = (path: string) => {
    navigate(path)
  }

  useEffect(() => {
    if (userEmail !== undefined) {
      void getusersinfo(userEmail).then((userinfoData: any) => {
        setuserstInfo(userinfoData[0])
      })
    }
  }, [])

  console.log("유저정보", userstInfo)

  return (
    <MenuBarWrap>
      <MyPageHead>{userstInfo?.displayName}님 페이지</MyPageHead>
      <MenuItem
        active={activeMenuItem === `/OtherProfilePage/${userEmail}`}
        onClick={() => {
          handleMenuItemClick(`/OtherProfilePage/${userEmail}`)
        }}
      >
        {userstInfo?.displayName}님 프로필
      </MenuItem>
      <MenuItem
        active={activeMenuItem === `/OtherPostPage/${userEmail}`}
        onClick={() => {
          handleMenuItemClick(`/OtherPostPage/${userEmail}`)
        }}
      >
        {userstInfo?.displayName}님이 쓴 글
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
