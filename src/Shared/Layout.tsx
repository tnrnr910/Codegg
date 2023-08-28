import React, { useState, useEffect } from "react"
import { useNavigate, Outlet } from "react-router"
import { styled } from "styled-components"
import { auth } from "../axios/firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"

function Header() {
  const navigate = useNavigate()

  const [currentUser, setCurrentUser] = useState(auth.currentUser)
  useEffect(() => {
    // 사용자 인증 정보 확인하기
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      console.log("onAuthStateChanged user", user) // 사용자 인증 정보가 변경될 때마다 해당 이벤트를 받아 처리합니다.
    })
    console.log("currentUser", currentUser)
  }, [])

  // 로그아웃 함수
  const logOut = async (event: any) => {
    event.preventDefault()
    await signOut(auth)
    alert("정상적으로 로그아웃 되었습니다.")
    navigate("/")
  }

  return (
    <>
      <StHeader>
        <p
          onClick={() => {
            navigate("/")
          }}
        >
          codegg
        </p>
        <Pagelist>
          <Stp
            onClick={() => {
              navigate("/QnAPage")
            }}
          >
            질의응답
          </Stp>
          <Stp
            onClick={() => {
              navigate("/TipPage")
            }}
          >
            코딩 팁
          </Stp>
          <Stp
            onClick={() => {
              navigate("/TogetherPage")
            }}
          >
            모임
          </Stp>
          <Stp
            onClick={() => {
              navigate("/NoticePage")
            }}
          >
            공지사항
          </Stp>
          <Stp
            onClick={() => {
              navigate("/PointShopPage")
            }}
          >
            포인트 샵
          </Stp>
          <input />
        </Pagelist>
        <Authcontainer>
          {auth.currentUser == null ? (
            <>
              <StAuth
                onClick={() => {
                  navigate("/SigninPage")
                }}
              >
                로그인
              </StAuth>
              <StAuth
                onClick={() => {
                  navigate("/SigninPage")
                }}
              >
                회원가입
              </StAuth>
            </>
          ) : (
            <>
              <StAuth>{auth.currentUser.email}</StAuth>
              <StAuth
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={logOut}
              >
                로그아웃
              </StAuth>
            </>
          )}
        </Authcontainer>
      </StHeader>
    </>
  )
}

function Footer() {
  return (
    <StFooter>
      <StFooterdiv>
        <p>
          서비스 소개 이용양관 디렉토리 개인정보 처리 방침 Codegg 기업 서비스
          신고 가이드
        </p>
        <p>@2023 Codegg Project by Enjoy2 @2023 Designed by seonyougPark</p>
      </StFooterdiv>
      <StFooterbox>MORE INFO</StFooterbox>
      <StFooterbox>CONTACT US</StFooterbox>
    </StFooter>
  )
}

function Layout() {
  return (
    <>
      <Header />
      <StLayout>
        <Outlet />
      </StLayout>
      <Footer />
    </>
  )
}

export default Layout

const StHeader = styled.div`
  width: 100%;
  background: #1a4475;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e9e6d8;
  font-weight: 600;
`

const Pagelist = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
`
const Stp = styled.p`
  cursor: pointer;
`
const Authcontainer = styled.div`
  width: 15%;
  display: flex;
  gap: 24px;
  margin-left: 100px;
`

const StAuth = styled.div`
  cursor: pointer;
`
const StFooter = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  background: #1a4475;
  color: #e9e6d8;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  gap: 1rem;
`

const StFooterdiv = styled.div`
  display: flex;
  flex-direction: column;
`

const StFooterbox = styled.div`
  width: 8rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid black 1px;
  border-radius: 22.5px;
`

const StLayout = styled.div`
  color: black;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 90vh;
  padding: 0px;
`
