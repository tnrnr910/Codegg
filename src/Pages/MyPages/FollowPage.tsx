import React, { useEffect, useState } from "react"
import styled from "styled-components"
import MyPageMenuBar from "../../Components/MyPageMenuBar"
import {
  getfollowData,
  getfollowerData,
  getfollowerInfo,
  getUsersInfo
} from "../../axios/api"
import { useNavigate } from "react-router"
import { auth } from "../../axios/firebase"

interface usersInfo {
  id: string
  badgeImg: string
  displayName: string
  email: string
  isAdmin: string
  profileImg: string
  follower: number
  following: number
}

interface followInfo {
  id: string
  followUserEmail: string
  userEmail: string
}

interface TabOption {
  value: string
  label: string
}

const FollowPage: React.FC = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("Follow")
  const [followUserInfo, setFollowUserInfo] = useState<usersInfo[]>([])
  const [followerinfo, setFollowerInfo] = useState<usersInfo[]>([])
  const activeMenuItem = "/FollowPage"

  useEffect(() => {
    if (auth.currentUser !== null) {
      void getfollowData(auth.currentUser?.email).then((followData: any) => {
        const followUserEmail = followData.map(
          (item: followInfo) => item.followUserEmail
        )
        if (followUserEmail !== undefined) {
          const userInfopromises: any[] = []

          followUserEmail.forEach((item: string) => {
            const userInfoPromise = getUsersInfo(item)
            userInfopromises.push(userInfoPromise)
          })
          Promise.all(userInfopromises)
            .then((userInfos) => {
              const userInfoes = userInfos.flat(Infinity)
              setFollowUserInfo(userInfoes)
            })
            .catch((error) => {
              console.error(error)
            })
        }
      })

      void getfollowerData(auth.currentUser?.email).then(
        (followerData: any) => {
          const followerEmail = followerData.map(
            (item: followInfo) => item.userEmail
          )

          if (followerEmail !== undefined) {
            const followerInfopromises: any[] = []

            followerEmail.forEach((item: string) => {
              const followerInfoPromise = getfollowerInfo(item)
              followerInfopromises.push(followerInfoPromise)
            })
            Promise.all(followerInfopromises)
              .then((followerInfos) => {
                const followerInfoes = followerInfos.flat(Infinity)
                setFollowerInfo(followerInfoes)
              })
              .catch((error) => {
                console.error(error)
              })
          }
        }
      )
    }
  }, [])
  // 탭탭탭
  const tabOptions: TabOption[] = [
    { value: "Follow", label: "팔로우한 계정" },
    { value: "Followers", label: "팔로워 계정" }
  ]

  return (
    <MyPostWrap>
      <MyPageMenuBar activeMenuItem={activeMenuItem} />
      <StyledContainer>
        <StyledTitle>팔로우/팔로워</StyledTitle>

        <StyledTabButtons>
          {tabOptions.map((tab) => (
            <StyledButton
              key={tab.value}
              className={activeTab === tab.value ? "active" : ""}
              onClick={() => {
                setActiveTab(tab.value)
              }}
            >
              {tab.label}
            </StyledButton>
          ))}
        </StyledTabButtons>
        <UserCardContainer>
          {activeTab === "Follow"
            ? followUserInfo.map((user) => (
                <UserCard
                  key={user.id}
                  onClick={() => {
                    navigate(`/OtherProfilePage/${user.email}`)
                  }}
                >
                  <UserProfileImage
                    src={user.profileImg}
                    alt={user.displayName}
                  />
                  <UserName>{user.displayName}</UserName>
                </UserCard>
              ))
            : activeTab === "Followers"
            ? followerinfo.map((user) => (
                <UserCard
                  key={user.id}
                  onClick={() => {
                    navigate(`/OtherProfilePage/${user.email}`)
                  }}
                >
                  <UserProfileImage
                    src={user.profileImg}
                    alt={user.displayName}
                  />
                  <UserName>{user.displayName}</UserName>
                </UserCard>
              ))
            : null}
        </UserCardContainer>
      </StyledContainer>
    </MyPostWrap>
  )
}
const MyPostWrap = styled.div`
  display: flex;
  margin-top: 2rem;
  justify-content: center;
`
const StyledContainer = styled.div`
  padding: 1.25rem;
  width: 66rem;
  height: 780px;
`

const StyledTitle = styled.div`
  margin-bottom: 3.125rem;
  font-size: 1.5625rem;
  font-weight: bold;
`

const StyledTabButtons = styled.div`
  background-color: #f4f4f4;
  height: 3.125rem;
  display: flex;
  border: 0.0625rem solid #dadada;
  margin-bottom: 1.25rem;
  border-radius: 0.625rem 0.625rem 0 0;
`

const StyledButton = styled.button`
  border-radius: ${(props) =>
    props.children === "질의응답" ? "0.5625rem 0 0 0" : ""};
  background-color: ${(props) =>
    props.className === "active" ? "#fff" : "transparent"};
  border-style: solid;
  border-color: #dadada;
  border-width: 0 0.0625rem 0 0;
  padding: 0.625rem 1.25rem;
  height: ${(props) => (props.className === "active" ? "3.1875rem" : "")};
  cursor: pointer;
  color: #333;
  font-weight: ${(props) => (props.className === "active" ? "bold" : "normal")};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.className === "active" ? "#f0f0f0" : "#e0e0e0"};
  }
`

const UserCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* 카드 간격 조절 */
`

const UserCard = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const UserProfileImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
`

const UserName = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
`

export default FollowPage
