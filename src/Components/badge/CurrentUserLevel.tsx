import React from "react"
import { getUsersInfos } from "../../axios/api"
import { useQuery } from "react-query"
import { auth } from "../../axios/firebase"

function CurrentUserLevel() {
  const { data, isLoading, isError } = useQuery("usersinfo", getUsersInfos)
  const usersinfosData: any = data
  let level: string | undefined

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading data</div>
  }

  const currentUserInfoData = usersinfosData?.find((data: any) => {
    return data.id === auth.currentUser?.email
  })

  const userTotalPoint = currentUserInfoData.userTotalPoint
  if (userTotalPoint >= 0 && userTotalPoint <= 99) {
    level = "입문자"
  } else if (userTotalPoint >= 100 && userTotalPoint <= 199) {
    level = "주니어"
  } else if (userTotalPoint >= 200 && userTotalPoint <= 299) {
    level = "시니어"
  } else if (userTotalPoint >= 300 && userTotalPoint <= 399) {
    level = "프로"
  } else if (userTotalPoint >= 400) {
    level = "마스터"
  } else if (userTotalPoint <= 0) {
    level = "관리자"
  }

  return (
    <>
      <div>{level}</div>
    </>
  )
}

export default CurrentUserLevel
