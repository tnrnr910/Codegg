import React, { useEffect, useState } from "react"
import { styled } from "styled-components"
import { useParams } from "react-router"
import OtherPageMenuBar from "../../Components/OtherPageMenuBar"
import {
  findfollow,
  findfollowNumber,
  getusersinfo,
  setfollow
} from "../../axios/api"
import { auth, db } from "../../axios/firebase"
import { doc, onSnapshot } from "firebase/firestore"

interface usersinfo {
  id: string
  badgeImg: string
  displayName: string
  email: string
  isAdmin: string
  profileImg: string
  follower: number
  following: number
}

function OtherProfilePage() {
  const { email } = useParams()
  const activeMenuItem = `/OtherProfilePage/${email}`
  const [userstInfo, setuserstInfo] = useState<usersinfo>()
  const [follower, setFollower] = useState<number>()
  const [following, setFollowing] = useState<number>()
  const [isfollow, setIsfollow] = useState<boolean>(false)

  useEffect(() => {
    if (email !== undefined) {
      void getusersinfo(email).then((dummyData: any) => {
        setuserstInfo(dummyData)
      })

      if (userstInfo !== undefined) {
        findfollowNumber(email)

        setFollower(userstInfo?.follower)
        setFollowing(userstInfo?.following)

        onSnapshot(doc(db, "usersinfo", userstInfo.id), (doc) => {
          setFollower(doc?.data()?.follower)
          setFollowing(doc?.data()?.following)
        })
      }

      console.log(follower, following)

      if (auth.currentUser != null) {
        findfollow(email, auth.currentUser.email).then((bool: boolean) => {
          if (bool) {
            setIsfollow(true)
          } else {
            setIsfollow(false)
          }
        })
      }
    }
  }, [])

  console.log(isfollow)

  const FollowHandler = () => {
    if (auth.currentUser != null) {
      findfollow(email, auth.currentUser.email).then((bool: boolean) => {
        if (!bool) {
          setIsfollow(true)
          setfollow(false, userstInfo?.email, auth.currentUser?.email)
        } else {
          setIsfollow(false)
          setfollow(true, userstInfo?.email, auth.currentUser?.email)
        }
      })
    }
  }

  return (
    <ProfileWrap>
      <OtherPageMenuBar activeMenuItem={activeMenuItem} />
      <ProfileTap>
        <ProfileRightSide>
          <ProfileHead>{userstInfo?.displayName}님 프로필</ProfileHead>
          <ProfileDetail>
            <ProfileImgs>
              <ProfileImgBox>
                <ProfileImage
                  src={userstInfo?.profileImg ?? require("./profile.jpg")}
                />
              </ProfileImgBox>
              <ProfileLevelAndNickName>
                <div>
                  <BadgeWrap>
                    <BadgeImage
                      src={userstInfo?.badgeImg ?? require("./profile.jpg")}
                    />
                    <div>입문자</div>
                  </BadgeWrap>
                </div>
                <NickName>{userstInfo?.displayName}</NickName>
              </ProfileLevelAndNickName>
            </ProfileImgs>
            <MyDataWrap>
              <MyData>
                <Follower>팔로워 {follower}</Follower>
                <Following>팔로잉 {following}</Following>
                <MyPost>작성글 32</MyPost>
              </MyData>
              <FollowBtn onClick={FollowHandler}>
                {isfollow ? <div>팔로우 취소</div> : <div>+팔로우 하기</div>}
              </FollowBtn>
              <MyStackAndPW>
                <StackNotice>관심 있는 기술 태그</StackNotice>
                <Stacks>React / Node / Spring</Stacks>
              </MyStackAndPW>
            </MyDataWrap>
          </ProfileDetail>
        </ProfileRightSide>
      </ProfileTap>
    </ProfileWrap>
  )
}

export default OtherProfilePage

const ProfileWrap = styled.div`
  display: flex;
  margin-top: 6.875rem;
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
  flex-direction: column;
  height: 6.125rem;
  margin-bottom: 2.5rem;
  gap: 22px;
`
const ProfileImgBox = styled.div`
  width: 12.5rem;
  height: 12.5rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: 50%;
  background-color: #d9d9d9;
`
const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 70%;
  object-fit: cover;
`
const ProfileLevelAndNickName = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.375rem;
  justify-content: center;
  align-items: center;
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
  margin-top: 12px;
`
const MyData = styled.div`
  display: flex;
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
const MyDataWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 16.25rem;
  margin-top: 101px;
`
const FollowBtn = styled.button`
  width: 356px;
  height: 52px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 60px;
  font-weight: bold;
  border: solid #0c356a 1px;
  border-radius: 4px;
  color: #0c356a;
  background-color: #ffffff;
`

const MyStackAndPW = styled.div`
  width: 15.4375rem;
  height: 2.125rem;
  display: flex;
  flex-direction: column;
`
const StackNotice = styled.div`
  margin-bottom: 0.625rem;
  font-weight: bold;
`
const Stacks = styled.div`
  margin-bottom: 3.125rem;
  font-size: 0.7656rem;
`
