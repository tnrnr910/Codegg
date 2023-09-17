import React, { useEffect, useState } from "react"
import { styled } from "styled-components"
import { useNavigate } from "react-router"
import { auth, db } from "../../axios/firebase"
import MyPageMenuBar from "../../Components/MyPageMenuBar"
import { onAuthStateChanged, type User } from "firebase/auth"
import { useQuery } from "react-query"
import { getusersinfos } from "../../axios/api"
import { collection, getDocs, query, where } from "firebase/firestore"

// eslint-disable-next-line @typescript-eslint/no-redeclare
interface auth {
  currentUser: string
}

function MyProfilePage() {
  const navigate = useNavigate()
  const activeMenuItem = "/MyProfilePage"
  const [userCurrentPoint, setUserCurrentPoint] = useState<number | null>(null)
  const [currentUser, setCurrentUser] = useState<User | null>(null) // User 타입 사용
  const { data } = useQuery("usersinfo", getusersinfos)
  const usersinfoData: any = data
  const [myPostCount, setMyPostCount] = useState<number>(0)
  const [followingCount, setFollowingCount] = useState<number>(0)
  const [followerCount, setFollowerCount] = useState<number>(0)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  }, [])

  useEffect(() => {
    if (currentUser != null && Boolean(usersinfoData)) {
      const currentUserInfo = usersinfoData.find(
        (user: any) => user.email === currentUser?.email
      )
      if (currentUserInfo != null) {
        setUserCurrentPoint(currentUserInfo.currentPoint)
      }
    }
  }, [currentUser, usersinfoData])

  useEffect(() => {
    const fetchUserPostCount = async () => {
      if (currentUser?.email != null) {
        const q = query(
          collection(db, "posts"),
          where("postUserEmail", "==", currentUser.email)
        )
        const querySnapshot = await getDocs(q)
        const postCount = querySnapshot.size
        setMyPostCount(postCount)
      }
    }

    void fetchUserPostCount()
  }, [currentUser])

  useEffect(() => {
    const fetchFollowingAndFollowersCount = async () => {
      if (currentUser?.email != null) {
        const followingQuery = query(
          collection(db, "follow"),
          where("userEmail", "==", currentUser.email)
        )
        const followingSnapshot = await getDocs(followingQuery)
        const followingCount = followingSnapshot.size
        const followerQuery = query(
          collection(db, "follow"),
          where("followUserEmail", "==", currentUser.email)
        )
        const followerSnapshot = await getDocs(followerQuery)
        const followerCount = followerSnapshot.size

        setFollowingCount(followingCount)
        setFollowerCount(followerCount)
      }
    }

    void fetchFollowingAndFollowersCount()
  }, [currentUser])

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
                  src={currentUser?.photoURL ?? require("./profile.jpg")}
                />
              </ProfileImgBox>
              <ProfileLevelAndNickName>
                <div>
                  <BadgeWrap>
                    <BadgeImage src={require("./profile.jpg")} alt="프사" />
                    <div>입문자</div>
                  </BadgeWrap>
                </div>
                <NickName>{currentUser?.displayName}</NickName>
              </ProfileLevelAndNickName>
            </ProfileImgs>
            <MyDataWrap>
              <MyData>
                <Follower>팔로워 {followerCount}</Follower>
                <Following>팔로잉 {followingCount}</Following>
                <MyPost>
                  {myPostCount !== 0 ? `작성글 ${myPostCount}` : "작성글 0"}
                </MyPost>
              </MyData>
              <MyPoint>보유 포인트</MyPoint>
              <PointScore>{userCurrentPoint?.toLocaleString()}P</PointScore>
              <MyEmail>이메일</MyEmail>
              <EmailAd>{currentUser?.email}</EmailAd>
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
  padding: 1.25rem;
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
const BadgeImage = styled.img`
  width: 1.375rem;
  height: 1.375rem;
  border-radius: 50%;
  object-fit: cover;
`
const BadgeWrap = styled.div`
  display: flex;
  margin-bottom: 0.375rem;
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
