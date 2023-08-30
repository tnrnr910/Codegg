import React from "react"
import { styled } from "styled-components"
import { auth } from "../axios/firebase"

function ProfilePicture({ ...props }) {
  return (
    <>
      <ProfileImage
        src={
          auth.currentUser?.photoURL ?? require("../Pages/MyPages/profile.jpg")
        }
        {...props}
      />
    </>
  )
}

export default ProfilePicture

const ProfileImage = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
`
