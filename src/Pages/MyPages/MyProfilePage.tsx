import React from "react"
import { styled } from "styled-components"

function MyProfilePage() {
  return (
    <ProfileWrap>
      <ProfileTap>
        <ProfileMenuBar>마이페이지</ProfileMenuBar>
        <ProfileRightSide>
          <ProfileHead>프로필 관리</ProfileHead>
          <ProfileDetail>
            <ProfileImgs>
              <ProfileImg>프사</ProfileImg>
              <ProfileLevelAndNickName>
                <div>
                  <div>뱃지</div>
                  <div>입문자</div>
                </div>
                <div>에그마요</div>
              </ProfileLevelAndNickName>
            </ProfileImgs>
            <div>
              <div>
                <div>팔로워</div>
                <div>팔로잉</div>
                <div>작성글</div>
              </div>
              <div>보유 포인트</div>
              <div>이메일</div>
              <div>123@123.123</div>
              <div>
                <div>관심 있는 기술 태그</div>
                <div>사용 중인 기술이나 관심있는 기술 태그를 선택해주세요.</div>
                <div>React / Node / Spring</div>
              </div>
              <div>비밀번호 변경</div>
              <div>변경을 원하시면 `수정` 버튼을 클릭해주세요.</div>
              <button>수정</button>
            </div>
          </ProfileDetail>
        </ProfileRightSide>
      </ProfileTap>
    </ProfileWrap>
  )
}

export default MyProfilePage

const ProfileWrap = styled.div`
  display: flex;
  margin-top: 8rem;
  height: 47.66rem;
`

const ProfileTap = styled.div`
  display: flex;
  margin-left: 19.3125rem;
  width: 51.8125rem;
  margin-right: 48.875rem;
`
const ProfileMenuBar = styled.div`
  margin-right: 3.125rem;
  margin-top: 0.2rem;
  width: 9.25rem;
  font-weight: bold;
  font-size: 1.2rem;
`
const ProfileHead = styled.div`
  font-size: 2.2rem;
  font-weight: bold;
  margin-left: 2.5rem;
  width: 19.3125rem;
`
const ProfileRightSide = styled.div`
  display: flex;
  text-align: center;
  width: 42.5625rem;
  flex-direction: column;
  border-left: solid 1px #dadada;
`
const ProfileDetail = styled.div`
  margin-top: 1.875rem;
  width: 23.25rem;
  margin-left: 19.3125rem;
`
const ProfileImgs = styled.div`
  display: flex;
  justify-content: center;
  height: 6.125rem;
  margin-bottom: 2.5rem;
`
const ProfileImg = styled.div`
  width: 6.125rem;
  height: 6.125rem;
  display: flex;
  margin-right: 0.625rem;
  justify-content: center;
  flex-direction: column;
`
const ProfileLevelAndNickName = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`
