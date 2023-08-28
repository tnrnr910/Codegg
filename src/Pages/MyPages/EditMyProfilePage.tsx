import React from "react"
import { styled } from "styled-components"
import { useNavigate } from "react-router"

function EditMyProfilePage() {
  const navigate = useNavigate()

  const handleImageChange = () => {
    console.log("프로필 변경")
  }

  return (
    <ProfileWrap>
      <ProfileTap>
        <ProfileMenuBar>
          <MenuBar>마이페이지</MenuBar>
        </ProfileMenuBar>
        <ProfileRightSide>
          <ProfileHead>프로필 관리</ProfileHead>
          <ProfileDetail>
            <ProfileImgs>
              <ProfileImgBox>
                <ProfileImage src={require("./profile.jpg")} alt="프사" />
                <ProfileImageChange
                  src={require("./ProfileChange.png")}
                  alt="변경"
                  onClick={handleImageChange}
                />
              </ProfileImgBox>
            </ProfileImgs>
            <MyDataWrap>
              <MyEmail>이메일</MyEmail>
              <EmailAd>123@123.123</EmailAd>
              <NickNameWrap>
                <NickName>닉네임</NickName>
                <NickNameInput type="text" placeholder="에그마요" />
              </NickNameWrap>
              <MyStackAndPW>
                <StackArea>관심 있는 기술 태그</StackArea>
                <StackNotice>
                  사용 중인 기술이나 관심있는 기술 태그를 선택해주세요.
                </StackNotice>
                <Stacks>React / Node / Spring</Stacks>
                <PassWordChange>비밀번호 변경</PassWordChange>
                <PassWordChangeInPut
                  type="text"
                  placeholder="비밀번호를 입력해주세요"
                />
                <PassWordCheck>비밀번호 확인</PassWordCheck>
                <PassWordConfirmInPut
                  type="text"
                  placeholder="입력한 비밀번호를 다시 한 번 입력해주세요."
                />
                <SaveBottom
                  onClick={() => {
                    navigate("/MyProfilePage")
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
`
const ProfileImageChange = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 30%;
  height: auto;
  cursor: pointer;
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
