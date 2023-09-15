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

export default CuurentUserBadge

const BadgeImage = styled.img`
  width: 1rem;
  height: 1.3rem;
  object-fit: contain;
`
