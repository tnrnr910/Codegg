import React, { useState, useEffect } from "react"
import { useNavigate, Outlet } from "react-router"
import { styled } from "styled-components"
import { auth } from "../axios/firebase"
import { onAuthStateChanged, signOut, deleteUser } from "firebase/auth"
import Swal from "sweetalert2"
import { BiSearch } from "react-icons/bi"

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
    if (currentUser != null) {
      // currentUser가 null이 아닌 경우에만 실행
      await signOut(auth)
      void Swal.fire("성공적으로 로그아웃 되었습니다.")
      navigate("/")
    }
  }

  // 회원탈퇴 함수
  const deleteCurrentUser = async (event: any) => {
    event.preventDefault()
    if (currentUser != null) {
      // currentUser가 null이 아닌 경우에만 실행
      await deleteUser(currentUser)
      void Swal.fire("성공적으로 탈퇴되었습니다.")
      navigate("/")
    }
  }

  return (
    <>
      <HeaderContainer>
        <Logo
          onClick={() => {
            navigate("/")
          }}
          src={require("../asset/img/logo.png")}
          alt="로고"
        />
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
          <SearchInput>
            <InputField />
            <SearchIcon />
          </SearchInput>
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
              {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
              <StAuth onClick={deleteCurrentUser}>회원탈퇴</StAuth>
              <StAuth>{auth.currentUser?.displayName}님.안녕하세요.</StAuth>
              {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
              <StAuth onClick={logOut}>프로필</StAuth>
            </>
          )}
        </Authcontainer>
      </HeaderContainer>
    </>
  )
}

function Footer() {
  return (
    <FooterContainer>
      <FooterBox>
        <FooterBody>
          <FooterBodyDiv>서비스 소개</FooterBodyDiv>
          <FooterBodyDiv>이용양관</FooterBodyDiv>
          <FooterBodyDiv>디렉토리</FooterBodyDiv>
          <FooterBodyDiv>개인정보 처리 방침</FooterBodyDiv>
          <FooterBodyDiv>Codegg 기업 서비스</FooterBodyDiv>
          <FooterBodyDiv>신고 가이드</FooterBodyDiv>
        </FooterBody>
        <FooterDiretor>
          <div>@2023 Codegg Project by Enjoy2</div>
          <div>@2023 Designed by seonyougPark</div>
        </FooterDiretor>
      </FooterBox>
      <FooterBtnbox>
        <FooterBtnbody>MORE INFO</FooterBtnbody>
        <FooterBtnbody>CONTACT US</FooterBtnbody>
      </FooterBtnbox>
    </FooterContainer>
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

const HeaderContainer = styled.div`
  width: 100%;
  background: #ffffff;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
`
const Logo = styled.img`
  width: 144px;
  height: 38px;
  margin-right: 59px;
  cursor: pointer;
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
const FooterContainer = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  background: #ffffff;
  color: #e9e6d8;
  align-items: center;
  justify-content: space-evenly;
  font-size: 12px;
  gap: 1rem;
`

const FooterBox = styled.div`
  display: flex;
  flex-direction: column;
`

const FooterBody = styled.div`
  display: flex;
`

const FooterDiretor = styled.div`
  display: flex;
  color: #9f9f9f;
  gap: 45px;
  padding: 15px 10px 0px 10px;
`
const FooterBodyDiv = styled.div`
  font-size: 15px;
  color: #9f9f9f;
  border-right: solid #9f9f9f 1px;
  padding: 0px 10px 0px 10px;
`

const FooterBtnbox = styled.div`
  display: flex;
  gap: 1rem;
`
const FooterBtnbody = styled.div`
  width: 8rem;
  height: 2rem;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid #dadada 1px;
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

const SearchInput = styled.div`
  display: flex;
  align-items: center;
  width: 270px;
  height: 40px;
  margin-right: 12px 0px 12px 0px;
  border: solid 1px #63717f;
  float: left;
  color: #63717f;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
`

const InputField = styled.input`
  flex: 1;
  border: none;
  outline: none;
  color: #63717f;
  padding-right: 10px;
`

const SearchIcon = styled(BiSearch)`
  color: #63717f;
`
