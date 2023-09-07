import React, { useState, useEffect } from "react"
import { useNavigate, Outlet } from "react-router"
import { styled } from "styled-components"
import { auth } from "../axios/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { BiSearch } from "react-icons/bi"
import ProfilePicture from "../Components/ProfilePicture"
import OpenProfile from "../Components/OpenProfile"
import { getSearchedData } from "../axios/api"
import { useDispatch, useSelector } from "react-redux"

interface RootState {
  searchResults: any[]
}
function Header() {
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(auth.currentUser)
  const [searchTerm, setSearchTerm] = useState("")

  const searchResults = useSelector((state: RootState) => state.searchResults)

  const dispatch = useDispatch()

  useEffect(() => {
    // 사용자 인증 정보 확인하기
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      // console.log("onAuthStateChanged user", user) // 사용자 인증 정보가 변경될 때마다 해당 이벤트를 받아 처리합니다.
    })
    console.log("currentUser", currentUser)
  }, [])

  // 프로필 모달 오픈
  const openModal = (e: any) => {
    setIsOpen(true)
  }

  const closeModal = (e: any) => {
    setIsOpen(false)
  }

  const handleSearchInputChange = (e: any) => {
    setSearchTerm(e.target.value)
  }

  const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleSearch = () => {
    getSearchedData(searchTerm)
      .then((searchResults) => {
        dispatch({ type: "SET_SEARCH_RESULTS", payload: searchResults })
        navigate("/SearchResultPage")
      })
      .catch((error) => {
        console.error("검색 에러:", error)
      })
  }

  useEffect(() => {}, [searchResults])
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
            <InputField
              type="text"
              value={searchTerm}
              onChange={handleSearchInputChange}
              onKeyDown={handleEnterKeyPress}
            />
            <SearchIcon onClick={handleSearch} />
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
              <StAuth
                onClick={() => {
                  navigate("/MyProfilePage")
                }}
              >
                {auth.currentUser?.displayName}님.안녕하세요.
              </StAuth>
              <ProfilePicture
                onClick={openModal}
                style={{ width: "2.5rem", height: "2.5rem", cursor: "pointer" }}
              />
            </>
          )}
        </Authcontainer>
      </HeaderContainer>
      {isOpen && <OpenProfile closeModal={closeModal} />}
    </>
  )
}

function Footer() {
  return (
    <FooterContainer>
      <FooterBox>
        <FooterBody>
          <FooterBodyDiv>서비스 소개</FooterBodyDiv>
          <FooterBodyDiv>이용약관</FooterBodyDiv>
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
    <Wrapper>
      <Header />
      <StLayout>
        <Outlet />
      </StLayout>
      <Footer />
    </Wrapper>
  )
}

export default Layout

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`

const HeaderContainer = styled.div`
  width: 100%;
  background: #ffffff;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  position: sticky;
  top: 0;
  z-index: 10;
`
const Logo = styled.img`
  width: 9rem;
  height: 2.375rem;
  margin-right: 3.6875rem;
  cursor: pointer;
`
const Pagelist = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`
const Stp = styled.p`
  cursor: pointer;
`
const Authcontainer = styled.div`
  width: 15%;
  display: flex;
  gap: 1.5rem;
  margin-left: 6.25rem;
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
  font-size: 0.75rem;
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
  gap: 2.8125rem;
  padding: 0.9375rem 0.625rem 0rem 0.625rem;
`
const FooterBodyDiv = styled.div`
  font-size: 0.9375rem;
  color: #9f9f9f;
  border-right: solid #9f9f9f 1px;
  padding: 0rem 0.625rem 0rem 0.625rem;
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
  border-radius: 1.40625rem;
`

const StLayout = styled.div`
  /* color: black;
  background-color: white; */
  display: flex;
  flex-direction: column;
  align-items: center;
  /* min-height: 80vh; */
  height: auto;
  /* padding: 0px; */
`

const SearchInput = styled.div`
  display: flex;
  align-items: center;
  width: 16.875rem;
  height: 2.5rem;
  margin-right: 0.75rem 0rem 0.75rem 0rem;
  border: solid 1px #63717f;
  float: left;
  color: #63717f;
  -webkit-border-radius: 0.3125rem;
  -moz-border-radius: 0.3125rem;
  border-radius: 0.3125rem;
`

const InputField = styled.input`
  flex: 1;
  border: none;
  outline: none;
  color: #63717f;
  padding-right: 0.625rem;
`

const SearchIcon = styled(BiSearch)`
  color: #63717f;
  cursor: pointer;
`
