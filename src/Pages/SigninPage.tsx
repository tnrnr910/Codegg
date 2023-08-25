import React, { useState } from "react"
import styled from "styled-components"
import { FcGoogle } from "react-icons/fc"
import { auth } from "../axios/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"

function SigninPage() {
  // Tab Menu 중 현재 어떤 Tab이 선택되어 있는지 확인하기 위한 currentTab 상태와 currentTab을 갱신하는 함수가 존재해야 하고, 초기값은 0.
  const [currentTab, setCurrentTab] = useState(0)

  // Tab Menu 이름
  const menuArr = [{ name: "로그인" }, { name: "회원가입" }]

  // 현재 선택된 Tab Menu 가 갱신되는 함수
  const selectMenuHandler = (index: any) => {
    // parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않는다
    setCurrentTab(index)
  }

  // 이메일과 패스워드 초기값
  const [email, setEmail] = useState("")
  const [nickname, setNickname] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const inputChange = (event: any) => {
    const {
      target: { name, value }
    } = event
    if (name === "email") {
      setEmail(value)
      console.log(email)
    }
    if (name === "nickname") {
      setNickname(value)
      console.log(nickname)
    }
    if (name === "password") {
      setPassword(value)
      console.log(password)
    }
    if (name === "confirmPassword") {
      setConfirmPassword(value)
      console.log(confirmPassword)
    }
  }

  // 회원가입 버튼 클릭 시 실행
  const signUp = async (event: any) => {
    event.preventDefault()
    if (password === confirmPassword) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential: any) => {
          // Signed in
          const user = userCredential.user
          console.log(user)
          selectMenuHandler(0)
        })
        .catch((error: any) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(errorCode, errorMessage)
        })
    } else {
      alert("비밀번호를 다시 확인해 주세요")
    }
  }

  // 로그인 버튼 클릭 시 실행
  const signIn = (event: any) => {
    event.preventDefault()
  }

  // 로그아웃 버튼 클릭 시 실행
  const logOut = (event: any) => {
    event.preventDefault()
  }

  return (
    <SigninSignoutContainer>
      <TabBox>
        <TabMenu>
          {menuArr.map((el, index) => (
            <li
              key={el.name}
              className={index === currentTab ? "submenu focused" : "submenu"}
              onClick={() => {
                selectMenuHandler(index)
              }}
            >
              {el.name}
            </li>
          ))}
        </TabMenu>
        <Desc>
          {currentTab === 0 ? (
            // 로그인 탭 영역
            <TapContents>
              <SigninButton style={{ backgroundColor: "#ffffff" }}>
                <FcGoogle size="20px" />
                Sign In with Google
              </SigninButton>
              <p>또는 이메일 로그인</p>
              <SigninInput>
                <div>이메일</div>
                {/* <input
                  type="email"
                  name="email"
                  value={email}
                  placeholder="이메일을 입력해 주세요."
                  onChange={inputChange}
                  required
                ></input> */}
              </SigninInput>
              <SigninInput>
                <div>비밀번호</div>
                {/* <input
                  type="password"
                  name="password"
                  value={password}
                  placeholder="비밀번호를 입력해 주세요."
                  onChange={inputChange}
                  required
                ></input> */}
              </SigninInput>
              <SigninButton
                onClick={signIn}
                style={{
                  backgroundColor: "#0C356A",
                  color: "#fff",
                  fontSize: "1.25rem"
                }}
              >
                로그인
              </SigninButton>
              <OtherTap>
                <span>아직 회원이 아니신가요?</span>
                <span
                  onClick={() => {
                    selectMenuHandler(1)
                  }}
                >
                  회원가입
                </span>
              </OtherTap>
              <button onClick={logOut}>로그아웃</button>
            </TapContents>
          ) : (
            // 회원가입 탭 영역
            <TapContents>
              <SigninInput>
                <div>이메일</div>
                <input
                  type="email"
                  name="email"
                  value={email}
                  placeholder="이메일을 입력해 주세요."
                  onChange={inputChange}
                  required
                ></input>
              </SigninInput>
              <SigninInput>
                <div>닉네임</div>
                <input
                  type="text"
                  name="nickname"
                  value={nickname}
                  placeholder="닉네임을 입력해 주세요."
                  onChange={inputChange}
                  required
                ></input>
              </SigninInput>
              <SigninInput>
                <div>비밀번호</div>
                <input
                  type="password"
                  name="password"
                  value={password}
                  placeholder="비밀번호를 확인해 주세요."
                  onChange={inputChange}
                  required
                ></input>
              </SigninInput>
              <SigninInput>
                <div>비밀번호 확인</div>

                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  placeholder="비밀번호를 입력해 주세요."
                  onChange={inputChange}
                  required
                ></input>
              </SigninInput>
              <CheckLabel htmlFor="check">
                <input type="checkbox" id="check" />
                <p>
                  I agree with CODEGG’s Terms of Service, Privacy Policy, and
                  Default Notification Settings.
                </p>
              </CheckLabel>
              <SigninButton
                onClick={signUp}
                style={{
                  backgroundColor: "#0C356A",
                  color: "#fff",
                  fontSize: "1.25rem"
                }}
              >
                회원가입
              </SigninButton>
              <OtherTap>
                <span>이미 회원이신가요?</span>
                <span
                  onClick={() => {
                    selectMenuHandler(0)
                  }}
                >
                  로그인
                </span>
              </OtherTap>
            </TapContents>
          )}
        </Desc>
      </TabBox>
    </SigninSignoutContainer>
  )
}

export default SigninPage

// Styled-Component 라이브러리를 활용해 TabMenu 와 Desc 컴포넌트의 CSS를 구현.

const SigninSignoutContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: end;
  background-color: #c0c0c0;
`

const TabBox = styled.div`
  width: 30rem;
  margin: 2rem 4rem;
  border-radius: 1rem;
  background-color: #fff;
`

const TabMenu = styled.ul`
  width: 100%;
  height: 3rem;
  background-color: #f4f4f4;
  color: #000;
  display: flex;
  list-style: none;
  border-radius: 1rem 1rem 0 0;
  cursor: pointer;

  .submenu {
    // 기본 Tabmenu에 대한 CSS를 구현
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% / 2);
    font-size: 15px;
    transition: 0.2s;
    border-radius: 10px 10px 0px 0px;
  }

  .focused {
    //선택된 Tabmenu에만 적용되는 CSS를 구현
    background-color: rgb(255, 255, 255);
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }
`

const Desc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`

const TapContents = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: start;
  gap: 2rem;
  margin: 2rem 0;

  & > div {
    width: 100%;
  }

  & > p {
    color: #999999;
    font-size: 0.9rem;
    display: flex;
    width: 100%;
    align-items: center;
  }

  & > p::before,
  p::after {
    background: #dadada;
    content: "";
    flex-grow: 1;
    margin: 0 10px;
    height: 0.5px;
    font-size: 0;
    line-height: 1px;
  }
`

const SigninButton = styled.button`
  width: 100%;
  height: 3rem;

  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid #dadada;
  border-radius: 4px;
  gap: 0.5rem;
  cursor: pointer;
`

const SigninInput = styled.div`
  font-weight: bold;
  & > input {
    width: 96.5%;
    height: 2rem;

    padding: 0.5rem;
    margin-top: 10px;
    border: 1px solid #dadada;
    border-radius: 4px;
  }
`

const CheckLabel = styled.label`
  display: flex;
  align-items: center;
  user-select: none;
  gap: 1rem;
  color: #999999;

  // 체크박스가 체크되기 전 스타일
  & > input {
    appearance: none;
    width: 2rem;
    height: 1.3rem;
    border: 1px solid #dadada;
    border-radius: 0.2rem;
    margin: 0;
  }

  // 체크박스가 체크된 후 스타일
  & > input:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #0c356a;
  }
`

const OtherTap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;

  & > span:first-child {
    color: #999999;
  }

  & > span:last-child {
    color: #0c356a;
    text-decoration: underline;
    cursor: pointer;
  }
`

// const TapContents = styled.div`
//   width: 90%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   text-align: start;
//   gap: 2rem;
//   margin: 2rem 0;

//   & > div {
//     width: 100%;
//   }

//   & > p {
//     color: #999999;
//     font-size: 0.9rem;
//     display: flex;
//     width: 100%;
//     align-items: center;
//   }

//   & > p::before,
//   p::after {
//     background: #dadada;
//     content: "";
//     flex-grow: 1;
//     margin: 0 10px;
//     height: 0.5px;
//     font-size: 0;
//     line-height: 1px;
//   }
// `
