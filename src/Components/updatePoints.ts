import { getUsersInfos, type usersinfo } from "../axios/api"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../axios/firebase"
import updateUserBadge from "./badge/updateUserBadge"

export async function updatePoints(
  userEmail: string,
  currentPoint: number,
  totalPoint: number
) {
  const updatedCurrentPoint = currentPoint + 10
  const updatedTotalPoint = totalPoint + 0

  const usersinfoList = await getUsersInfos()

  const targetUser: usersinfo | undefined = usersinfoList.find(
    (user: usersinfo) => user.email === userEmail
  )

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (targetUser) {
    const userDocRef = doc(db, "usersinfo", targetUser.id)

    try {
      await updateDoc(userDocRef, {
        currentPoint: updatedCurrentPoint,
        totalPoint: updatedTotalPoint
      })
      await updateUserBadge(userEmail)
    } catch (error) {
      console.error("포인트 업데이트 실패:", error)
    }
  } else {
    console.log("사용자를 찾을 수 없습니다.")
  }
}
