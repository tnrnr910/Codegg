import { getAuth, onAuthStateChanged } from "firebase/auth"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import MyPageMenuBar from "../../Components/MyPageMenuBar"
import { getfollowData, getusersinfo } from "../../axios/api"

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
            // userInfos 배열에 사용자 정보가 저장됨
            console.log("데이터", data)

            // userInfos를 useState를 통해 상태에 저장
            setfollowUserinfo(data)
          })
          .catch((error) => {
            console.error("사용자 정보 가져오기 오류:", error)
          })
      }
    })
  }, [])

  console.log(userId, userinfo)
  console.log(followuserEmail)
  console.log(followuserinfo)
  // 탭탭탭
  const tabOptions: TabOption[] = [
    { value: "Follow", label: "팔로우" },
    { value: "Followers", label: "팔로워" }
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
          {followuserinfo.map((user) => (
            <UserCard key={user.id}>
              <UserProfileImage src={user.profileImg} alt={user.displayName} />
              <UserName>{user.displayName}</UserName>
              <UserEmail>{user.email}</UserEmail>
              {/* 여기에 추가 정보를 렌더링할 수 있습니다. */}
            </UserCard>
          ))}
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
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  width: 250px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

const UserEmail = styled.div`
  font-size: 14px;
  color: #666;
  margin-top: 5px;
`

export default FollowPage
