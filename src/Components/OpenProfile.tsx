/* eslint-disable @typescript-eslint/no-redeclare */
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { styled } from "styled-components"
import Swal from "sweetalert2"
import { auth, db } from "../axios/firebase"
import {
  GoogleAuthProvider,
  deleteUser,
  onAuthStateChanged,
  signOut
} from "firebase/auth"
import { deleteDoc, doc } from "firebase/firestore"
import { getUsersInfos } from "../axios/api"
import { useQuery } from "react-query"

interface auth {
  currentUser: string
}

function OpenProfile({ closeModal }: any) {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(auth.currentUser)
  const { data } = useQuery("usersInfo", getUsersInfos)
  const usersInfoData: any = data
  const [userCurrentPoint, setUserCurrentPoint] = useState<number | null>(null)

  useEffect(() => {
    // 사용자 인증 정보 확인하기
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  }, [])

  useEffect(() => {
    if (currentUser != null && Boolean(usersInfoData)) {
      const currentUserInfo = usersInfoData.find(
        (user: any) => user.email === currentUser.email
      )
      if (currentUserInfo != null) {
        setUserCurrentPoint(currentUserInfo.currentPoint)
      }
    }
  }, [currentUser, usersInfoData])

  // 로그아웃 함수
  const logOut = (event: any) => {
    event.preventDefault()
    if (currentUser != null) {
      void signOut(auth)
      void Swal.fire({
        text: "정상적으로 로그아웃 되었습니다.",
        confirmButtonColor: "#0C356A"
      })
      navigate("/")
      closeModal()
    }
  }

  // 회원탈퇴 함수
  const deleteCurrentUser = (event: any) => {
    event.preventDefault()
    if (currentUser != null) {
      // currentUser가 null이 아닌 경우에만 실행
      void Swal.fire({
        title: "정말로 탈퇴하시겠습니까?",
        text: "탈퇴 버튼 선택 시, 계정은 삭제되며 복구되지 않습니다.",
        showCancelButton: true,
        confirmButtonColor: "#0C356A",
        cancelButtonColor: "#d33",
        confirmButtonText: "회원 탈퇴",
        cancelButtonText: "취소"
      }).then(async (result) => {
        if (result.isConfirmed) {
          // 현재 로그인한 사용자 문서를 삭제
          if (currentUser.email != null) {
            const currentUserInfoData = usersInfoData.find((data: any) => {
              return data.email === currentUser.email
            })
            void currentUser
              .getIdToken()
              .then((idToken) => {
                return GoogleAuthProvider.credential(idToken)
              })
              .then(async () => {
                await deleteDoc(doc(db, "usersInfo", currentUserInfoData?.id))
                // 현재 로그인한 사용자를 Authentication에서 삭제
                await deleteUser(currentUser)
                // 알림창 띄우고 홈페이지로 이동
                await Swal.fire({
                  title: "탈퇴 완료",
                  text: "정상적으로 탈퇴되었습니다.",
                  confirmButtonColor: "#0C356A"
                })
              })

            navigate("/")
            closeModal()
          }
        }
      })
    }
  }

  // const deleteUsersInfo = async (event: any) => {
  //   await deleteDoc(doc(db, "usersInfo", "3vkcOPh9Mn5YBADbU3sg"))
  // }

  return (
    <ModalBox
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          closeModal()
        }
      }}
    >
      <ModalContents>
        <ModalHead>
          <div>내프로필</div>
        </ModalHead>
        <ModalBody>
          <ProfileImage
            src={
              auth.currentUser?.photoURL ??
              require("../Pages/MyPages/profile.jpg")
            }
          />
          <ProfileName>{auth.currentUser?.displayName}</ProfileName>
          <ProfilePoint>
            보유 포인트 : {userCurrentPoint?.toLocaleString()}P
          </ProfilePoint>
          <ProfileEdit
            onClick={() => {
              navigate("/MyProfilePage")
              closeModal()
            }}
          >
            프로필 등록하기
          </ProfileEdit>
        </ModalBody>
        <Box>
          <div
            onClick={() => {
              navigate("/MyProfilePage")
            }}
            style={{ cursor: "pointer" }}
          >
            마이페이지
          </div>
          <div
            onClick={() => {
              navigate("/MyLetterPage")
            }}
            style={{ cursor: "pointer" }}
          >
            쪽지함
          </div>
          <LogoutBtn onClick={logOut}>로그아웃</LogoutBtn>
          <LogoutBtn onClick={deleteCurrentUser}>회원탈퇴</LogoutBtn>
        </Box>
      </ModalContents>
    </ModalBox>
  )
}

export default OpenProfile

export const Box = styled.div`
  width: 96%;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 4%;
  gap: 11px;
`

export const ModalBox = styled.div`
  position: fixed;
  top: 0;
  left: -40px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 1;
`

export const ModalContents = styled.div`
  background-color: #fff;
  width: 260px;
  height: 360px;
  border-radius: 12px;
  margin-left: 70%;
  margin-top: 3%;
  display: flex;
  flex-direction: column;
  border: 1px solid #d9d9d9;
`

const ModalHead = styled.div`
  width: 94%;
  height: 37px;
  font-size: 12px;
  font-weight: bold;
  padding-left: 14px;
  padding-top: 7px;
  border-bottom: solid #d9d9d9 1px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`
const ModalBody = styled.div`
  width: max;
  height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f8;
`

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 50%;
  object-fit: cover;
  margin: 12px;
`

const ProfileName = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 10px;
`

const ProfilePoint = styled.div`
  font-size: 12px;
  padding: 10px;
`

const ProfileEdit = styled.button`
  width: 164px;
  height: 26px;
  font-size: 12px;
  color: #a4a4a4;
  border: solid #d9d9d9 1px;
  background-color: #ffffff;
  cursor: pointer;
  margin: 10px;
`
const LogoutBtn = styled.div`
  cursor: pointer;
`
