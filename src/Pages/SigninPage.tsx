import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router"
import { FcGoogle } from "react-icons/fc"
import Swal from "sweetalert2"
// import swal from "sweetalert"

import { type SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { auth } from "../axios/firebase"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  setPersistence,
  browserSessionPersistence
} from "firebase/auth"

// 유효성검사 스키마
const schema = yup.object({
  email: yup
    .string()
    .email("이메일 형식을 입력해 주세요")
    .max(20, "20자 이하로 입력해 주세요")
    // .matches(
    //   /^[가-힣a-zA-Z][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?\s]*$/,
    //   "닉네임에 특수문자가 포함되면 안되고 숫자로 시작하면 안됩니다!"
    // )
    .required("이메일을 입력해 주세요"),
  displayName: yup
    .string()
    .min(2, "2자 이상 입력해 주세요")
    // .required("닉네임을 입력해 주세요")
    .max(20, "20자 이하로 입력해 주세요"),
  password: yup
    .string()
    .min(6, "6자 이상 입력해 주세요")
    .max(16, "16자 이하로 입력해 주세요")
    .required("비밀번호를 입력해 주세요"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "비밀번호가 일치하지 않습니다")
  // .required("비밀번호를 확인해 주세요")
})

type FormData = yup.InferType<typeof schema>

function SigninPage() {
  const navigate = useNavigate()

  // Tab Menu 중 현재 어떤 Tab이 선택되어 있는지 확인하기 위한 currentTab 상태와 currentTab을 갱신하는 함수가 존재해야 하고, 초기값은 0.
  const [currentTab, setCurrentTab] = useState(0)

  // Tab Menu 이름
  const menuArr = [{ name: "로그인" }, { name: "회원가입" }]

  // 현재 선택된 Tab Menu 가 갱신되는 함수()
  const selectMenuHandler = (index: any) => {
    // parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않는다
    setCurrentTab(index)
  }

  // 유효성 검사
  const {
    register,
    handleSubmit,
    watch,
    // getValues, // 리렌더링 없이 접근 가능
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  // 세션 지속성 설정 :현재의 세션이나 탭에서만 상태가 유지되며 사용자가 인증된 탭이나 창이 닫히면 삭제됨을 나타냅니다
  useEffect(() => {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        console.log("Session persistence successfully set!")
      })
      .catch((error) => {
        console.error("Error setting session persistence:", error)
      })
  }, [])

  // 회원가입 버튼 클릭 시 실행
  const onSubmitSignup: SubmitHandler<FormData> = () => {
    // event?.preventDefault()
    console.log(errors)
    signUp()
  }

  // 회원가입 버튼 클릭 시 유효성검사 통과 후 실행
  const signUp = () => {
    createUserWithEmailAndPassword(auth, emailWatch, passwordWatch)
      .then(async (userCredential: any) => {
        // Signed in
        const user = userCredential.user
        console.log(user)
        await loggedInSignUp()
      })
      .catch((error: any) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
        void Swal.fire("이미 사용중인 이메일입니다.")
      })
  }

  // 회원가입 성공 시 실행되는 함수
  // (회원정보 등록 후 로그아웃 등)
  const loggedInSignUp = async () => {
    if (auth.currentUser != null) {
      // awit : 프로미스가 품고있는 값을 바깥으로 끄집어냄 + 프로미스가 리졸빙 될 때까지 기다림
      await updateProfile(auth.currentUser, {
        displayName: displayNameWatch,
        photoURL: "https://i.ibb.co/K5B1hKZ/blank-profile.png"
      })
      await Swal.fire("환영합니다!", "성공적으로 회원가입되었습니다.")
      await signOut(auth)
      // await 뒤에는 프로미스만 올 수 있음
      reset()
      selectMenuHandler(0)
    } else {
      console.log("No user is signed in.") // 사용자가 로그인되어 있지 않은 경우
    }
  }

  // 로그인 버튼 클릭 시 실행
  const onSubmitSignin: SubmitHandler<FormData> = () => {
    console.log(errors)
    void signIn(event)
  }

  // 로그인 버튼 클릭 시 유효성검사 통과 후 실행
  const signIn = async (event: any) => {
    event.preventDefault()
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailWatch,
        passwordWatch
      )
      console.log("signIn", userCredential)
      reset()
      navigate("/")
      void Swal.fire({
        position: "center",
        title: "정상적으로 로그인 되었습니다.",
        text: "잠시 후 홈으로 이동합니다.",
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      console.error("signInError", error)
      void Swal.fire("이메일 혹은 비밀번호를 다시 입력해 주세요")
    }
  }

  // const onError = (error: any) => { console.log(error); }
  // const emailValues = getValues("email")
  const emailWatch = watch("email")
  const displayNameWatch = watch("displayName")
  const passwordWatch = watch("password")
  const confirmPasswordWatch = watch("confirmPassword")

  // 추출한 값 콘솔에 출력
  // console.log(
  //   emailWatch,
  //   displayNameWatch,
  //   passwordWatch,
  //   confirmPasswordWatch,
  //   errors.password
  // )

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
                reset()
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
              {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
              <form onSubmit={handleSubmit(onSubmitSignin)}>
                <SigninInput>
                  <label>이메일</label>
                  <input
                    type="email"
                    value={emailWatch}
                    placeholder="이메일을 입력해 주세요."
                    {...register("email")}
                  ></input>
                  {/* {errors.email != null && <span>This field is required</span>} */}
                  <p>{errors.email?.message}</p>
                </SigninInput>
                <SigninInput>
                  <label>비밀번호</label>
                  <input
                    type="password"
                    value={passwordWatch}
                    placeholder="비밀번호를 입력해 주세요."
                    // 레지스터가 react-hook-form과 연결해줌
                    {...register("password")}
                  ></input>
                  <p>{errors.password?.message}</p>
                </SigninInput>
                <SigninButton
                  style={{
                    backgroundColor: "#0C356A",
                    color: "#fff",
                    fontSize: "1.25rem"
                  }}
                >
                  로그인
                </SigninButton>
              </form>
              <OtherTap>
                <span>아직 회원이 아니신가요?</span>
                <span
                  onClick={() => {
                    selectMenuHandler(1)
                    reset()
                  }}
                >
                  회원가입
                </span>
              </OtherTap>
              {/* <button
                onClick={() => {
                  if (currentUser != null) {
                    console.log("current user", currentUser)
                  } else {
                    // No user is signed in.
                    console.log("no current user")
                  }
                }}
              >
                현재유저
              </button> */}
            </TapContents>
          ) : (
            // 회원가입 탭 영역
            <TapContents>
              {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
              <form onSubmit={handleSubmit(onSubmitSignup)}>
                <SigninInput>
                  <label>이메일</label>
                  <input
                    type="email"
                    value={emailWatch}
                    placeholder="이메일을 입력해 주세요."
                    {...register("email")}
                  ></input>
                  {/* {errors.email != null && <span>This field is required</span>} */}
                  <p>{errors.email?.message}</p>
                </SigninInput>
                <SigninInput>
                  <label>닉네임</label>
                  <input
                    type="text"
                    value={displayNameWatch}
                    placeholder="닉네임을 입력해 주세요."
                    {...register("displayName")}
                  ></input>
                  <p>{errors.displayName?.message}</p>
                </SigninInput>
                <SigninInput>
                  <label>비밀번호</label>
                  <input
                    type="password"
                    value={passwordWatch}
                    placeholder="비밀번호를 입력해 주세요."
                    // 레지스터가 react-hook-form과 연결해줌
                    {...register("password")}
                  ></input>
                  <p>{errors.password?.message}</p>
                </SigninInput>
                <SigninInput>
                  <label>비밀번호 확인</label>

                  <input
                    type="password"
                    value={confirmPasswordWatch}
                    placeholder="비밀번호를 확인해 주세요."
                    {...register("confirmPassword")}
                  ></input>
                  <p>{errors.confirmPassword?.message}</p>
                </SigninInput>
                <CheckLabel htmlFor="check">
                  <input type="checkbox" id="check" />
                  <p>
                    I agree with CODEGG’s Terms of Service, Privacy Policy, and
                    Default Notification Settings.
                  </p>
                </CheckLabel>
                <SigninButton
                  style={{
                    backgroundColor: "#0C356A",
                    color: "#fff",
                    fontSize: "1.25rem"
                  }}
                >
                  회원가입
                </SigninButton>
              </form>
              <OtherTap>
                <span>이미 회원이신가요?</span>
                <span
                  onClick={() => {
                    selectMenuHandler(0)
                    reset()
                    // getValues()
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

// Styled-Component 라이브러리를 활용해 CSS를 구현.

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
  gap: 1rem;
  margin: 2rem 0;

  & > form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
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
  width: 100%;

  & > input {
    width: 96.5%;
    height: 2rem;

    padding: 0.5rem;
    margin-top: 10px;
    border: 1px solid #dadada;
    border-radius: 4px;
  }

  & > p {
    color: red;
    font-weight: 500;
    font-size: 0.8rem;
    margin-top: 0.5rem;
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
