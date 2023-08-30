import React, { useState, useRef } from "react"
import { styled } from "styled-components"
import { useNavigate } from "react-router"
import { auth, storage } from "../../axios/firebase"
import { updatePassword, updateProfile } from "firebase/auth"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import MyPageMenuBar from "../../Components/MyPageMenuBar"

// eslint-disable-next-line @typescript-eslint/no-redeclare
interface auth {
  currentUser: string
  updateProfile: string
}

function EditMyProfilePage() {
  const navigate = useNavigate()
  const activeMenuItem = "/MyProfilePage"

  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value)
  }

  const handleConfirmNewPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmNewPassword(e.target.value)
  }

  const changePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      alert("비밀번호가 일치하지 않습니다.")
      return
    }
    try {
      if (auth.currentUser?.uid != null) {
        await updatePassword(auth.currentUser, newPassword)
        navigate("/MyProfilePage")
      }
    } catch (error) {
      console.error("비밀번호 변경 오류:", error)
      alert("비밀번호 변경 중 오류가 발생했습니다.")
    }
  }

  const [nickName, setNickName] = useState<string | null>(
    auth.currentUser?.displayName ?? null
  )
  const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value)
  }

  const [userPhoto, setUserPhoto] = useState<string | null>(
    auth.currentUser?.displayName ?? null
  )

  const fileRef = useRef<HTMLInputElement | null>(null)

  const handleImageChange = () => {
    fileRef.current?.click()
  }

  const handleUserPhotoChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]

    if (file != null) {
      try {
        const storageRefPath = ref(storage as any, "user_photos/" + file.name)
        console.log(storageRefPath)
        await uploadBytes(storageRefPath, file)
        const downloadURL = await getDownloadURL(storageRefPath)
        console.log(downloadURL)
        setUserPhoto(downloadURL)
      } catch (error) {
        console.error("프로필 사진 변경 오류:", error)
        alert("프로필 사진 변경 중 오류가 발생했습니다.")
      }
    }
  }

  const saveProfile = async () => {
    try {
      const currentUser = auth.currentUser
      if (currentUser != null && nickName !== null && userPhoto !== null) {
        await updateProfile(currentUser, {
          displayName: nickName,
          photoURL: userPhoto
        })
        alert("프로필 정보가 변경되었습니다.")
      } else {
        alert("사용자가 로그인하지 않았거나 닉네임이 비어있습니다.")
      }
    } catch (error) {
      console.error("프로필 변경 오류:", error)
      alert("프로필 변경 중 오류가 발생했습니다.")
    }
  }

  console.log(auth.currentUser)

  // 로그인 유지(로컬, 세션스토리지 등) / 비밀번호 틀려도 로그인 됨

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
                  src={auth.currentUser?.photoURL ?? require("./profile.jpg")}
                  alt="프사"
                />
                <ProfileImageChange
                  src={require("./ProfileChange.png")}
                  alt="변경"
                  onClick={handleImageChange}
                />
                <ProfileImageChangeinput
                  src={require("./ProfileChange.png")}
                  type="file"
                  accept="image/*"
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onChange={handleUserPhotoChange}
                  ref={fileRef}
                />
              </ProfileImgBox>
            </ProfileImgs>
            <MyDataWrap>
              <MyEmail>이메일</MyEmail>
              <EmailAd>{auth.currentUser?.email}</EmailAd>
              <NickNameWrap>
                <NickName>닉네임</NickName>
                <NickNameInput
                  type="text"
                  placeholder={
                    auth.currentUser?.displayName !== null
                      ? auth.currentUser?.displayName
                      : ""
                  }
                  value={nickName ?? ""} // null인 경우에 대비하여 널 병합 연산자 사용
                  onChange={handleNickNameChange}
                />
              </NickNameWrap>
              <MyStackAndPW>
                <StackArea>관심 있는 기술 태그</StackArea>
                <StackNotice>
                  사용 중인 기술이나 관심있는 기술 태그를 선택해주세요.
                </StackNotice>
                <Stacks>React / Node / Spring</Stacks>
                <PassWordChange>비밀번호 변경</PassWordChange>
                <PassWordChangeInPut
                  type="password"
                  placeholder="새로운 비밀번호를 입력해주세요."
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />
                <PassWordCheck>비밀번호 확인</PassWordCheck>
                <PassWordConfirmInPut
                  type="password"
                  placeholder="새로운 비밀번호를 다시 한 번 입력해주세요."
                  value={confirmNewPassword}
                  onChange={handleConfirmNewPasswordChange}
                />
                <SaveBottom
                  onClick={() => {
                    void changePassword()
                    void saveProfile()
                  }}
                >
                  저장
                </SaveBottom>
              </MyStackAndPW>
            </MyDataWrap>
          </ProfileDetail>
        </ProfileRightSide>
      </ProfileTap>
    </ProfileWrap>
  )
}

export default EditMyProfilePage

const ProfileWrap = styled.div`
  display: flex;
  margin-top: 4.875rem;
  height: 47.66rem;
`
const ProfileTap = styled.div`
  display: flex;
  width: 53.0625rem;
  margin-right: 48.875rem;
`
const ProfileHead = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  margin-left: 2.5rem;
  width: 7.625rem;
`
const ProfileRightSide = styled.div`
  display: flex;
  text-align: center;
  width: 40.125rem;
  height: 46.4375rem;
  flex-direction: column;
  border-left: solid 1px #dadada;
`
const ProfileDetail = styled.div`
  margin-top: 1.875rem;
  width: 23.25rem;
  margin-left: 20.4375rem;
`
const ProfileImgs = styled.div`
  display: flex;
  height: 6.125rem;
  margin-bottom: 2.5rem;
`
const ProfileImgBox = styled.div`
  position: relative;
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
  src: ${auth.currentUser?.photoURL};
`
const ProfileImageChange = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 30%;
  height: auto;
  cursor: pointer;
`
const ProfileImageChangeinput = styled.input`
  display: none;
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
  width: 22.25rem;
  height: 2.125rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
const StackArea = styled.div`
  margin-bottom: 0.625rem;
  font-weight: bold;
`
const Stacks = styled.div`
  margin-bottom: 3.125rem;
  font-weight: bold;
`
const PassWordChange = styled.div`
  font-weight: bold;
  margin-bottom: 0.625rem;
`
const PassWordCheck = styled.div`
  font-weight: bold;
  margin-bottom: 0.625rem;
`
const PassWordChangeInPut = styled.input`
  width: 22.25rem;
  height: 2.5rem;
  padding: 0.5rem;
  border: 1px solid #d9d9d9;
  border-radius: 0.25rem;
  font-size: 0.7656rem;
  color: #979797;
  margin-bottom: 3.75rem;
`
const PassWordConfirmInPut = styled.input`
  width: 22.25rem;
  height: 2.5rem;
  padding: 0.5rem;
  border: 1px solid #d9d9d9;
  border-radius: 0.25rem;
  font-size: 0.7656rem;
  color: #979797;
  margin-bottom: 2.75rem;
`

const SaveBottom = styled.button`
  width: 4rem;
  height: 2rem;
  margin-left: 19.4rem;
  background-color: #333333;
  border: 1px solid #d9d9d9;
  cursor: pointer;
  color: #fff;
  font-weight: bold;
`
const NickName = styled.div`
  font-weight: bold;
  margin-bottom: 0.625rem;
`
const NickNameInput = styled.input`
  width: 22.25rem;
  height: 2.5rem;
  padding: 0.5rem;
  border: 1px solid #d9d9d9;
  border-radius: 0.25rem;
  font-size: 0.7656rem;
  color: #979797;
`
const NickNameWrap = styled.div`
  width: 22.25rem;
  height: 2.125rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 4.125rem;
`
const StackNotice = styled.div`
  width: 100%;
  font-size: 0.7656rem;
  color: #979797;
  text-align: left;
  margin-bottom: 1.25rem;
`
