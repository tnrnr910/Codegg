import React from "react"
import { styled } from "styled-components"
import { useNavigate } from "react-router"
import { auth } from "../../axios/firebase"
import MyPageMenuBar from "../../Components/MyPageMenuBar"
import CurrentUserLevel from "../../Components/badge/CurrentUserLevel"
import CurrentUserBadge from "../../Components/badge/CuurentUserBadge"

// eslint-disable-next-line @typescript-eslint/no-redeclare
interface auth {
  currentUser: string
}

function MyProfilePage() {
  const navigate = useNavigate()
  const activeMenuItem = "/MyProfilePage"

  return (
    <ProfileWrap>
      <MyPageMenuBar activeMenuItem={activeMenuItem} />
      <ProfileTap>
        <ProfileRightSide>
          <ProfileHead>프로필 관리</ProfileHead>
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
                    <CurrentUserBadge />
                    <CurrentUserLevel />
                  </BadgeWrap>
                </div>
                <NickName>{auth.currentUser?.displayName}</NickName>
              </ProfileLevelAndNickName>
            </ProfileImgs>
            <MyDataWrap>
              <MyData>
                <Follower>팔로워 8</Follower>
                <Following>팔로잉 15</Following>
                <MyPost>작성글 32</MyPost>
              </MyData>
              <MyPoint>보유 포인트</MyPoint>
              <PointScore>10,000p</PointScore>
              <MyEmail>이메일</MyEmail>
              <EmailAd>{auth.currentUser?.email}</EmailAd>
              <MyStackAndPW>
                <StackNotice>관심 있는 기술 태그</StackNotice>
                <Stacks>React / Node / Spring</Stacks>
                <PassWordHead>비밀번호 변경</PassWordHead>
                <PassWordChange>
                  변경을 원하시면 `수정` 버튼을 클릭해주세요.
                </PassWordChange>
                <EditBottom
                  onClick={() => {
                    navigate("/EditMyProfilePage")
                  }}
                >
                  수정
                </EditBottom>
              </MyStackAndPW>
            </MyDataWrap>
          </ProfileDetail>
        </ProfileRightSide>
      </ProfileTap>
    </ProfileWrap>
  )
}

export default MyProfilePage

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
const NickName = styled.div`
  font-weight: bold;
`
const MyData = styled.div`
  display: flex;
  border: 1px solid #d9d9d9;
  margin-top: 2.1875rem;
  margin-bottom: 3rem;
  width: 15.4375rem;
  height: 2.125rem;
  justify-content: center;
`
const Follower = styled.div`
  justify-content: center;
  width: 100%;
  height: 2.125rem;
  align-items: center;
  display: flex;
  border-left: solid 1px #fff;
`
const Following = styled.div`
  border-left: solid 1px #dadada;
  justify-content: center;
  width: 100%;
  height: 2.125rem;
  align-items: center;
  display: flex;
`
const MyPost = styled.div`
  border-left: solid 1px #dadada;
  justify-content: center;
  width: 100%;
  height: 2.125rem;
  align-items: center;
  display: flex;
`
const MyPoint = styled.div`
  font-weight: bold;
  margin-bottom: 0.625rem;
`
const PointScore = styled.div`
  color: #979797;
  margin-bottom: 3.125rem;
  font-size: 0.7656rem;
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
const MyStackAndPW = styled.div`
  width: 15.4375rem;
  height: 2.125rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
const StackNotice = styled.div`
  margin-bottom: 0.625rem;
  font-weight: bold;
`
const Stacks = styled.div`
  margin-bottom: 3.125rem;
  font-size: 0.7656rem;
`
const PassWordHead = styled.div`
  font-weight: bold;
  margin-bottom: 0.625rem;
`
const PassWordChange = styled.div`
  width: 100%;
  font-size: 0.7656rem;
  margin-bottom: 5rem;
`
const EditBottom = styled.button`
  width: 4rem;
  height: 2rem;
  margin-left: 18rem;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  cursor: pointer;
  font-weight: bold;
`
