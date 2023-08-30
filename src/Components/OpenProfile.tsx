import React from "react"
import { styled } from "styled-components"

function OpenProfile() {
  return (
    <ProfileMenuBar>
      <MenuBar>마이페이지</MenuBar>
    </ProfileMenuBar>
  )
}

export default OpenProfile

const ProfileMenuBar = styled.div`
  margin-right: 3.125rem;
  margin-top: 0.2rem;
  margin-left: 13.125rem;
  width: 10.3125rem;
  font-weight: bold;
  font-size: 1.2rem;
`
const MenuBar = styled.div`
  width: 10.3125rem;
  margin-top: 4rem;
`
