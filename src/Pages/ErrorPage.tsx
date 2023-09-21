import React from "react"
import { styled } from "styled-components"
import { useNavigate } from "react-router"

function ErrorPage() {
  const navigate = useNavigate()

  return (
    <>
      <ErrorImg src={require("../asset/img/errorImg.png")} alt="badgeImage" />
      <ErrorMent>This page could not be found.</ErrorMent>
      <ErrorLink
        onClick={() => {
          navigate("/")
        }}
      >
        메인페이지로 이동하기
      </ErrorLink>
    </>
  )
}

export default ErrorPage

const ErrorImg = styled.img``

const ErrorMent = styled.div`
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 30px;
`
const ErrorLink = styled.div`
  font-weight: bold;
  cursor: pointer;
`
