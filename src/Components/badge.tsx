/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from "react"
import { auth } from "../axios/firebase"
import { styled } from "styled-components"
import { getusersinfos } from "../axios/api"
import { useQuery } from "react-query"

// eslint-disable-next-line @typescript-eslint/no-redeclare
// interface auth {
//   currentUser: string
// }

function badge() {
  return <div>badge</div>
}

export default badge

export function CurrentUserBadge() {
  const { data, isLoading, isError } = useQuery("usersinfo", getusersinfos)
  const usersinfosData: any = data
  let badgeImgUrl: string | undefined

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading data</div>
  }

  const currentUserInfoData = usersinfosData.find((data: any) => {
    return data.id === auth.currentUser?.email
  })

  const totalPoint = currentUserInfoData.totalPoint
  if (totalPoint > 0 && totalPoint < 100) {
    badgeImgUrl = "/img/lv1.png"
  } else if (totalPoint > 99 && totalPoint < 199) {
    badgeImgUrl = "/img/lv2.png"
  } else if (totalPoint > 199 && totalPoint < 299) {
    badgeImgUrl = "/img/lv3.png"
  } else if (totalPoint > 299 && totalPoint < 399) {
    badgeImgUrl = "/img/lv4.png"
  } else if (totalPoint > 299 && totalPoint < 399) {
    badgeImgUrl = "/img/lv5.png"
  }

  return (
    <>
      {/* <div>{auth.currentUser?.displayName}</div> */}
      <BadgeImage src={badgeImgUrl} alt="badgeImage" />
    </>
  )
}

export function CurrentUserLevel() {
  const { data, isLoading, isError } = useQuery("usersinfo", getusersinfos)
  const usersinfosData: any = data
  let level: string | undefined

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading data</div>
  }

  const currentUserInfoData = usersinfosData.find((data: any) => {
    return data.id === auth.currentUser?.email
  })

  const totalPoint = currentUserInfoData.totalPoint
  if (totalPoint > 0 && totalPoint < 100) {
    level = "입문자"
  } else if (totalPoint > 99 && totalPoint < 199) {
    level = "주니어"
  } else if (totalPoint > 199 && totalPoint < 299) {
    level = "시니어"
  } else if (totalPoint > 299 && totalPoint < 399) {
    level = "프로"
  } else if (totalPoint > 299 && totalPoint < 399) {
    level = "마스터"
  } else level = "관리자"

  return (
    <>
      {/* <div>{auth.currentUser?.displayName}</div> */}
      <div>{level}</div>
    </>
  )
}

const BadgeImage = styled.img`
  width: 1rem;
  height: 1.3rem;
  object-fit: contain;
`
