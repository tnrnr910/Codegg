import React from "react"
import { useQuery } from "react-query"
import { styled } from "styled-components"
import { getUsersInfos } from "../../axios/api"
import { auth } from "../../axios/firebase"

function CuurentUserBadge() {
  const { data, isLoading, isError } = useQuery("usersinfo", getUsersInfos)
  const usersinfosData: any = data
  let badgeImgUrl: string | undefined

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading data</div>
  }

  const currentUserInfoData = usersinfosData?.find((data: any) => {
    return data.id === auth.currentUser?.email
  })

  const userTotalPoint = currentUserInfoData?.userTotalPoint
  if (userTotalPoint >= 0 && userTotalPoint <= 99) {
    badgeImgUrl = "/img/lv1.png"
  } else if (userTotalPoint >= 100 && userTotalPoint <= 199) {
    badgeImgUrl = "/img/lv2.png"
  } else if (userTotalPoint >= 200 && userTotalPoint <= 299) {
    badgeImgUrl = "/img/lv3.png"
  } else if (userTotalPoint >= 300 && userTotalPoint <= 399) {
    badgeImgUrl = "/img/lv4.png"
  } else if (userTotalPoint >= 400) {
    badgeImgUrl = "/img/lv5.png"
  } else if (userTotalPoint <= 0) {
    badgeImgUrl = "/img/lv5.png"
  }

  return (
    <>
      <BadgeImage src={badgeImgUrl} alt="badgeImage" />
    </>
  )
}

export default CuurentUserBadge

const BadgeImage = styled.img`
  width: 1rem;
  height: 1.3rem;
  object-fit: contain;
`
