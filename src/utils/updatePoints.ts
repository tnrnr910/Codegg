import { getUsersInfos, type usersInfo } from "../axios/api"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../axios/firebase"
import updateBadgeLevel from "./updateBadgeLevel"

export async function updatePoints(
  userEmail: string,
  currentPoint: number,
  totalPoint: number
) {
  const updatedCurrentPoint = currentPoint + 10
  const updatedTotalPoint = totalPoint + 0

  const usersInfoList = await getUsersInfos()

  const targetUser: usersInfo | undefined = usersInfoList.find(
    (user: usersInfo) => user.email === userEmail
  )

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (targetUser) {
    const userDocRef = doc(db, "usersInfo", targetUser.id)

    try {
      await updateDoc(userDocRef, {
        currentPoint: updatedCurrentPoint,
        totalPoint: updatedTotalPoint
      })
      await updateBadgeLevel(userEmail)
    } catch (error) {
      console.error("포인트 업데이트 실패:", error)
    }
  } else {
    console.error("사용자를 찾을 수 없습니다.")
  }
}
