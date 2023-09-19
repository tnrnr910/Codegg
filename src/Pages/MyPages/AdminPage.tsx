import React, { useEffect, useState } from "react"
import { styled } from "styled-components"
import { auth } from "../../axios/firebase"
import AdminMenuBar from "../../Components/AdminMenuBar"
import { onAuthStateChanged, type User } from "firebase/auth"
import { useQuery } from "react-query"
import { getUsersInfos, getUserLevelAndBadge } from "../../axios/api"

function AdminPage() {
  const activeMenuItem = "/AdminPage"
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const { data } = useQuery("usersInfo", getUsersInfos)
  const usersInfoData: any = data
  const [userLevelAndBadge, setUserLevelAndBadge] = useState<any>(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  }, [])

  useEffect(() => {
    if (currentUser != null && Boolean(usersInfoData)) {
      void getUserLevelAndBadge().then((data: any) => {
        const userLevelAndBadge = data.find(
          (userLevelAndBadge: any) =>
            userLevelAndBadge.id === auth.currentUser?.email
        )
        setUserLevelAndBadge(userLevelAndBadge)
      })
    }
  }, [currentUser, usersInfoData])

  return (
    <ProfileWrap>
      <AdminMenuBar activeMenuItem={activeMenuItem} />
      <ProfileTap>
        <ProfileRightSide>
          <ProfileHead>관리자 프로필</ProfileHead>
          <ProfileDetail>
            <ProfileImgs>
              <ProfileImgBox>
                <ProfileImage
                  src={auth.currentUser?.photoURL ?? "img/blank-profile.png"}
                />
              </ProfileImgBox>
              <ProfileLevelAndNickName>
                <div>
                  <BadgeWrap>
                    <BadgeImage
                      src={userLevelAndBadge?.badgeImg}
                      alt="badgeImage"
                    />
                    <div>{userLevelAndBadge?.userLevel}</div>
                  </BadgeWrap>
                </div>
                <NickName>{currentUser?.displayName}</NickName>
              </ProfileLevelAndNickName>
            </ProfileImgs>
            <MyDataWrap>
              <MyEmail>이메일</MyEmail>
              <EmailAd>{currentUser?.email}</EmailAd>
            </MyDataWrap>
          </ProfileDetail>
        </ProfileRightSide>
      </ProfileTap>
    </ProfileWrap>
  )
}

export default AdminPage

const ProfileWrap = styled.div`
  display: flex;
  margin-top: 2rem;
  justify-content: center;
`
const ProfileTap = styled.div`
  display: flex;
  width: 66rem;
  margin-left: 2.5rem;
  flex-direction: column;
`
const ProfileHead = styled.div`
  font-size: 1.5625rem;
  font-weight: bold;
  text-align: start;
`
const ProfileRightSide = styled.div`
  display: flex;
  text-align: center;
  width: 40.125rem;
  height: 46.4375rem;
  flex-direction: column;
`
const ProfileDetail = styled.div`
  margin-top: 1.875rem;
  width: 66rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: -3rem;
`
const ProfileImgs = styled.div`
  display: flex;
  height: 6.125rem;
  margin-bottom: 2.5rem;
`
const ProfileImgBox = styled.div`
  width: 6.125rem;
  height: 6.125rem;
  display: flex;
  margin-right: 0.75rem;
  justify-content: center;
  flex-direction: column;
  border-radius: 50%;
  background-color: #d9d9d9;
`
const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`
const ProfileLevelAndNickName = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const BadgeWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.375rem;
  gap: 0.3rem;
`
const BadgeImage = styled.img`
  width: 1rem;
  height: 1.3rem;
  object-fit: contain;
`

const NickName = styled.div`
  font-weight: bold;
`
const MyDataWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 16.25rem;
`
const MyEmail = styled.div`
  margin-bottom: 0.625rem;
  font-weight: bold;
`
const EmailAd = styled.div`
  color: #979797;
  margin-bottom: 3.125rem;
  font-size: 0.7656rem;
`
