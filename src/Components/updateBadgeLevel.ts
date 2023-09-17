import { db } from "../axios/firebase"
import { getUsersInfos } from "../axios/api"
import { doc, updateDoc } from "firebase/firestore"

// 누적포인트에 따라 뱃지 이미지 url 변경
async function updateBadgeLevel(userEmail: string) {
  const usersInfosData: any = await getUsersInfos()

  const userinfoData = usersInfosData.find((data: { id: string }) => {
    return data.id === userEmail
  })

  const userTotalPoint = userinfoData?.totalPoint

  if (userTotalPoint >= 0 && userTotalPoint <= 99) {
    try {
      await updateDoc(doc(db, "userLevelAndBadge", userinfoData.id), {
        badgeImg: "/img/lv1.png",
        userLevel: "입문자"
      })
    } catch (error) {
      console.error("뱃지/레벨 업데이트 실패:", error)
    }
  } else if (userTotalPoint >= 100 && userTotalPoint <= 199) {
    try {
      await updateDoc(doc(db, "userLevelAndBadge", userinfoData.id), {
        badgeImg: "/img/lv2.png",
        userLevel: "주니어"
      })
    } catch (error) {
      console.error("뱃지/레벨 업데이트 실패:", error)
    }
  } else if (userTotalPoint >= 200 && userTotalPoint <= 299) {
    try {
      await updateDoc(doc(db, "userLevelAndBadge", userinfoData.id), {
        badgeImg: "/img/lv3.png",
        userLevel: "시니어"
      })
    } catch (error) {
      console.error("뱃지/레벨 업데이트 실패:", error)
    }
  } else if (userTotalPoint >= 300 && userTotalPoint <= 399) {
    try {
      await updateDoc(doc(db, "userLevelAndBadge", userinfoData.id), {
        badgeImg: "/img/lv4.png",
        userLevel: "프로"
      })
    } catch (error) {
      console.error("뱃지/레벨 업데이트 실패:", error)
    }
  } else if (userTotalPoint >= 400) {
    try {
      await updateDoc(doc(db, "userLevelAndBadge", userinfoData.id), {
        badgeImg: "/img/lv5.png",
        userLevel: "마스터"
      })
    } catch (error) {
      console.error("뱃지/레벨 업데이트 실패:", error)
    }
  } else if (userTotalPoint <= 0) {
    try {
      await updateDoc(doc(db, "userLevelAndBadge", userinfoData.id), {
        badgeImg: "/img/lv5.png",
        userLevel: "마스터"
      })
    } catch (error) {
      console.error("뱃지/레벨 업데이트 실패:", error)
    }
  } else {
    console.log("사용자를 찾을 수 없습니다.")
  }
}

export default updateBadgeLevel