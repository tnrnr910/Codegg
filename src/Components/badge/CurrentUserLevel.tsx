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

export default CurrentUserLevel
