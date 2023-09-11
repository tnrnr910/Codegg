import { getAuth, onAuthStateChanged } from "firebase/auth"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import MyPageMenuBar from "../../Components/MyPageMenuBar"
import { getfollowData, getfollowerData, getusersinfo } from "../../axios/api"

interface usersinfo {
  id: string
  badgeImg: string
  displayName: string
  email: string
  isAdmin: string
  profileImg: string
}

interface followinfo {
  id: string
  followuserEmail: string
  userEmail: string
}

interface TabOption {
  value: string
  label: string
}

const FollowPage: React.FC = () => {
  const auth = getAuth()
  const [activeTab, setActiveTab] = useState("questions")
  const [userId, setUserId] = useState<string | null>("")
  const [userinfo, setUserinfo] = useState<followinfo>()
  const [followuserinfo, setfollowUserinfo] = useState<usersinfo[]>([])
  const [followuserEmail, setFollowuserEmail] = useState<string[]>([])
  const [followerinfo, setfollowerInfo] = useState<usersinfo[]>([])
  const [followerEmail, setFollowEmail] = useState<string[]>([])
  const activeMenuItem = "/FollowPage"

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        console.log(user.email)
        setUserId(user.email)
        void getfollowData(user.email).then((dummyData: any) => {
          setUserinfo(dummyData)
          const followuserEmails = dummyData.map(
            (item: followinfo) => item.followuserEmail
          )
          setFollowuserEmail(followuserEmails)
        })

        Promise.all(followuserEmail.map((email: string) => getusersinfo(email)))
          .then((data) => {
            console.log("데이터", data)
            setfollowUserinfo(data)
          })
          .catch((error) => {
            console.error("사용자 정보 가져오기 오류:", error)
          })

        void getfollowerData(user.email).then((dummyData: any) => {
          setUserinfo(dummyData)
          const followerEmails = dummyData.map(
            (item: followinfo) => item.userEmail
          )
          setFollowEmail(followerEmails)
        })

        Promise.all(followerEmail.map((email: string) => getusersinfo(email)))
          .then((data) => {
            console.log("데이터", data)
            setfollowerInfo(data)
          })
          .catch((error) => {
            console.error("사용자 정보 가져오기 오류:", error)
          })
      }
    })
  }, [])

  console.log(userId, userinfo)
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
            ? followuserinfo.map((user) => (
                <UserCard key={user.id}>
                  <UserProfileImage
                    src={user.profileImg}
                    alt={user.displayName}
                  />
                  <UserName>{user.displayName}</UserName>
                </UserCard>
              ))
            : activeTab === "Followers"
            ? followerinfo.map((user) => (
                <UserCard key={user.id}>
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
  margin-top: 6.875rem;
  justify-content: center;
`
const StyledContainer = styled.div`
  padding: 1.25rem;
  width: 66rem;
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
