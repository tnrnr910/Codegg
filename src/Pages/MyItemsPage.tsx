/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import PointShopMenuBar from "../Components/PointShopMenuBar"
import {
  applyPostItems,
  getPoint,
  getUserItems,
  updateUserItems
} from "../axios/api"
import { getAuth, onAuthStateChanged } from "firebase/auth"

interface ShopItem {
  id: number
  name: string
  price: number
  type: string
  value: string

  style?: {
    color?: string
    fontWeight?: string
    backgroundColor?: string
    fontSize?: string
    fontFamily?: string
  }
}

interface item {
  type: string
  value: string
}

interface myItemList {
  postTitleBold: string
  postTitleColor: string
  postTitleFont: string
  postTitleSize: string
}

const PointShopPage: React.FC = () => {
  const auth = getAuth()
  const [userId, setUserId] = useState<string | null>("")
  const [userPoints, setUserPoints] = useState(0)
  const [selectedItems, setSelectedItems] = useState<ShopItem[]>([])
  const [myItemList, setMyItemList] = useState<ShopItem[]>([])
  const [showDescription, setShowDescription] = useState<boolean>(false)
  const [selectedItemsList, setSelectedItemsList] = useState<number[]>([])
  const activeMenuItem = "/MyItemsPage"

  const items: ShopItem[] = [
    {
      id: 1,
      name: "게시글 타이틀 볼드체 변경",
      price: 100,
      type: "postTitleBold",
      value: "bold",

      style: { fontWeight: "bold" }
    },
    {
      id: 11,
      name: "게시글 타이틀 사이즈 변경 - 15pt",
      price: 200,
      type: "postTitleSize",
      value: "15pt",
      style: { fontSize: "15pt" }
    },
    {
      id: 21,
      name: "게시글 타이틀 색상 변경 - 주황",
      price: 300,
      type: "postTitleColor",
      value: "orange",
      style: { color: "orange" }
    },
    {
      id: 22,
      name: "게시글 타이틀 색상 변경 - 빨강",
      price: 300,
      type: "postTitleColor",
      value: "red",
      style: { color: "red" }
    },
    {
      id: 23,
      name: "게시글 타이틀 색상 변경 - 초록",
      price: 300,
      type: "postTitleColor",
      value: "green",
      style: { color: "green" }
    },
    {
      id: 24,
      name: "게시글 타이틀 색상 변경 - 파랑",
      price: 300,
      type: "postTitleColor",
      value: "blue",
      style: { color: "blue" }
    },
    {
      id: 31,
      name: "게시글 타이틀 폰트 변경 - 나눔고딕",
      price: 200,
      type: "postTitleFont",
      value: "Nanum Gothic",
      style: { fontFamily: "Nanum Gothic" }
    }
  ]

  // 맨처음 페이지 렌더링시 작동하는 useEffect
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        setUserId(user?.email)
        void getPoint(user?.email).then((dummyData: number) => {
          setUserPoints(dummyData)
        })
        void getUserItems(user?.email).then((dummyData: myItemList) => {
          const TempItemList: ShopItem[] = []
          if (dummyData !== undefined) {
            if (dummyData.postTitleBold !== "") {
              const tempItemBold: ShopItem | undefined = items.find(
                (item) => item.value === dummyData.postTitleBold
              )

              if (tempItemBold !== undefined) {
                TempItemList.push(tempItemBold)
              }
            }
            if (dummyData.postTitleSize !== "") {
              const tempItemSize: ShopItem | undefined = items.find(
                (item) => item.value === dummyData.postTitleSize
              )

              if (tempItemSize !== undefined) {
                TempItemList.push(tempItemSize)
              }
            }
            if (dummyData.postTitleColor !== "") {
              const tempItemColor: ShopItem | undefined = items.find(
                (item) => item.value === dummyData.postTitleColor
              )

              if (tempItemColor !== undefined) {
                TempItemList.push(tempItemColor)
              }
            }
            if (dummyData.postTitleFont !== "") {
              const tempItemFont: ShopItem | undefined = items.find(
                (item) => item.value === dummyData.postTitleFont
              )

              if (tempItemFont !== undefined) {
                TempItemList.push(tempItemFont)
              }
            }
          }
          setMyItemList(TempItemList)
        })
      }
    })
  }, [])

  const handleItemSelect = (item: ShopItem) => {
    if (userPoints >= item.price) {
      let bool = false
      selectedItems?.map((itemOfItems) => {
        if (itemOfItems.id === item.id) {
          bool = true
        }
        return bool
      })
      if (bool) {
        setSelectedItemsList(selectedItemsList.filter((i) => i !== item.id))
        setSelectedItems(selectedItems.filter((i) => i.id !== item.id))
      } else {
        setSelectedItemsList([...selectedItemsList, item.id])
        setSelectedItems([...selectedItems, item])
      }
    } else {
      alert("포인트가 부족합니다.")
    }
  }

  const toggleDescription = () => {
    setShowDescription(!showDescription)
  }

  const deleteSelectedItems = async () => {
    const items: item[] = selectedItems.map((item) => {
      const tempItem = {
        type: item.type,
        value: ""
      }
      return tempItem
    })
    if (items.length !== 0) {
      await updateUserItems(userId, items)
      // eslint-disable-next-line array-callback-return
      items.map((item) => {
        setMyItemList(myItemList.filter((myItem) => myItem.type !== item.type))
      })
      setSelectedItems([])
      setSelectedItemsList([]) // 선택 취소 버튼 클릭 시 모든 항목 선택 해제
      alert("구매한 아이템이 삭제되었습니다.")
    } else {
      alert("포인트가 부족합니다.")
    }
  }

  const applySelectedItems = async () => {
    const items: item[] = selectedItems.map((item) => {
      const tempItem = {
        type: item.type,
        value: item.value
      }
      return tempItem
    })

    await applyPostItems(userId, items)
    setSelectedItems([])
    setSelectedItemsList([])
    alert("선택한 아이템이 적용되었습니다.")
  }

  return (
    <PointShopWrap>
      <PointShopMenuBar activeMenuItem={activeMenuItem} />
      <ShopContainer>
        <StyledTitle>내가 구매한 상품</StyledTitle>

        <ItemList>
          <PointListNameBox>
            <ListName> 효과</ListName>
            <ListPointName>사용 포인트</ListPointName>
          </PointListNameBox>

          {/* 본문 내용 */}
          {myItemList.map((item) => (
            <Item
              key={item.id}
              onMouseEnter={toggleDescription}
              onMouseLeave={toggleDescription}
              style={item.style}
            >
              <CheckBox
                type="checkbox"
                onChange={() => {
                  handleItemSelect(item)
                }}
                checked={selectedItemsList.includes(item.id)}
              />
              <ItemName>{item.name}</ItemName>
              <ItemPrice>{item.price} 포인트</ItemPrice>

              {showDescription && (
                <DescriptionContainer>
                  {item.name}에 대한 설명입니다.
                </DescriptionContainer>
              )}
            </Item>
          ))}
        </ItemList>
        <BtnBox>
          <div>
            <CancelButton
              onClick={() => {
                setSelectedItemsList([])
              }}
            >
              선택 취소
            </CancelButton>
          </div>
          <Box>
            <CancelButton onClick={applySelectedItems}>적용 하기</CancelButton>
            <ApplyButton onClick={deleteSelectedItems}>삭제하기</ApplyButton>
          </Box>
        </BtnBox>
      </ShopContainer>
    </PointShopWrap>
  )
}

const PointShopWrap = styled.div`
  display: flex;
  margin-top: 2rem;
  min-height: 800px;
`
const PointListNameBox = styled.div`
  width: 100%;
  text-align: right;
  display: flex;
  height: 1.875rem;
  margin-top: 0.625rem;
  margin-bottom: 1.25rem;
  border-top: 0.0625rem solid #dadada;
  padding-top: 0.875rem;
  border-bottom: 0.0625rem solid #333333;
`

const ListName = styled.div`
  flex: 1;
  float: right;
  width: 30px;
  text-align: center;
  font-size: 0.875rem;
  padding-left: 40px;
`

const ListPointName = styled.div`
  display: inline-block;
  width: 140px;
  text-align: center;
  font-size: 0.875rem;
`

const ShopContainer = styled.div`
  margin: 20px auto;
  margin-left: 100px;
  flex-direction: column;
  display: flex;
  padding: 1.25rem;
  width: 66rem;
`

const ItemList = styled.ul`
  font-size: 0.875rem;
  width: 70%;
`

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`

const ItemName = styled.span`
  white-space: nowrap; /* 텍스트 줄 바꿈 방지 */
  overflow: hidden; /* 텍스트 오버플로우 시 숨김 처리 */
  text-overflow: ellipsis; /* 텍스트가 숨겨질 때 ...로 표시 */
  width: 500px;
  text-align: left;
`

const ItemPrice = styled.span`
  all: initial;
  float: inline-end;
  font-size: 13px;
  margin-right: 35px;
`

const CheckBox = styled.input`
  height: 20px;
  width: 20px;
`

const BtnBox = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
`
const CancelButton = styled.button`
  background-color: white;
  color: black;
  font-weight: bold;
  font-size: 14px;
  border: 1px solid black;
  border-radius: 4px;
  padding: 8px 8px;
  cursor: pointer;
  margin-top: 20px;
  margin-right: 20px;
  width: 100px;
  margin-right: auto;
`

const ApplyButton = styled.button`
  background-color: #0c356a;
  color: #fff;
  border: none;
  font-size: 14px;
  border-radius: 4px;
  padding: 8px 8px;
  cursor: pointer;
  margin-top: 20px;
  margin-right: 20px;
  width: 100px;
  margin-left: auto;
`

const StyledTitle = styled.div`
  margin-bottom: 3.125rem;
  font-size: 1.5625rem;
  font-weight: bold;
  float: left;
`

const DescriptionContainer = styled.div`
  background-color: #f9f9f9;
  padding: 10px;
  border: 1px solid #ddd;
  margin-top: 10px;
  display: none;
`

const Box = styled.div`
  display: flex;
  gap: 5px;
`
export default PointShopPage
