import React, { useState } from "react"
import styled from "styled-components"
import PointShopMenuBar from "../Components/PointShopMenuBar"

interface ShopItem {
  id: number
  name: string
  price: number

  style?: {
    color?: string
    fontWeight?: string
    backgroundColor?: string
    fontSize?: string
    fontFamily?: string
  }
}

const PointShopPage: React.FC = () => {
  const [userPoints, setUserPoints] = useState(2000)
  const [selectedItems, setSelectedItems] = useState<ShopItem[]>([])
  const [showDescription, setShowDescription] = useState<boolean>(false)

  const items: ShopItem[] = [
    {
      id: 1,
      name: "게시글 타이틀 볼드체 변경",
      price: 100,
      style: { fontWeight: "bold" }
    },
    {
      id: 2,
      name: "게시글 타이틀 색상 변경 - 주황",
      price: 300,
      style: { color: "#orange" }
    },
    {
      id: 3,
      name: "게시글 타이틀 색상 변경 - 빨강",
      price: 300,
      style: { color: "red" }
    },
    {
      id: 4,
      name: "게시글 타이틀 사이즈 변경 - 15pt",
      price: 200,
      style: { fontSize: "15pt" }
    },
    {
      id: 5,
      name: "게시글 타이틀 색상 변경 - 초록",
      price: 100,
      style: { color: "green" }
    },
    {
      id: 6,
      name: "게시글 타이틀 색상 변경 - 파랑",
      price: 150,
      style: { color: "blue" }
    },
    {
      id: 7,
      name: "게시글 타이틀 폰트 변경 - 나눔고딕",
      price: 200,
      style: { fontFamily: "Nanum Gothic" }
    }
  ]

  const handleItemSelect = (item: ShopItem) => {
    if (userPoints >= item.price) {
      if (selectedItems.includes(item)) {
        setSelectedItems(selectedItems.filter((i) => i !== item))
      } else {
        setSelectedItems([...selectedItems, item])
      }
    } else {
      alert("포인트가 부족합니다.")
    }
  }

  const toggleDescription = () => {
    setShowDescription(!showDescription)
  }

  const applySelectedItems = () => {
    const totalPrice = selectedItems.reduce(
      (total, item) => total + item.price,
      0
    )
    if (userPoints >= totalPrice) {
      setUserPoints(userPoints - totalPrice)
      setSelectedItems([])
      alert("선택한 아이템이 적용되었습니다.")
    } else {
      alert("포인트가 부족합니다.")
    }
  }

  return (
    <PointShopWrap>
      <PointShopMenuBar activeMenuItem={""} />
      <ShopContainer>
        <StyledTitle>포인트샵</StyledTitle>
        <p>보유 포인트: {userPoints}</p>

        <ItemList>
          <PointListNameBox>
            <ListName>효과</ListName> <ListPointName>필요 포인트</ListPointName>
          </PointListNameBox>

          {/* 본문 내용 */}
          {items.map((item) => (
            <Item
              key={item.id}
              onMouseEnter={toggleDescription}
              onMouseLeave={toggleDescription}
              style={item.style}
            >
              <CheckBox
                type="checkbox"
                checked={selectedItems.includes(item)}
                onChange={() => {
                  handleItemSelect(item)
                }}
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

        <ApplyButton onClick={applySelectedItems}>구매하기</ApplyButton>
      </ShopContainer>
    </PointShopWrap>
  )
}

const PointShopWrap = styled.div`
  display: flex;
  margin-top: 2rem;
  justify-content: center;
  height: 780px;
`
const PointListNameBox = styled.div`
  width: 100%;
  text-align: right;
  height: 1.875rem;
  margin-top: 0.625rem;
  margin-bottom: 1.25rem;
  border-top: 0.0625rem solid #dadada;
  padding-top: 0.875rem;
  border-bottom: 0.0625rem solid #333333;
`

const ListName = styled.div`
  float: left;
  width: 5.625rem;
  text-align: center;
  font-size: 0.875rem;
`

const ListPointName = styled.div`
  display: inline-block;
  width: 5.625rem;
  text-align: center;
  font-size: 0.875rem;
`

const ShopContainer = styled.div`
  margin: 20px auto;
  max-width: 600px;
  text-align: center;
  flex-direction: column;
  display: flex;
  padding: 1.25rem;
  width: 66rem;
`

const ItemList = styled.ul`
  width: 33rem;
  text-align: center;
  font-size: 0.875rem;
  margin-left: 80px;
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
  flex: 1;
`

const ItemPrice = styled.span`
  flex: 1;
`

const CheckBox = styled.input`
  flex: 0.5;
  height: 20px;
  width: 20px;
`

const ApplyButton = styled.button`
  background-color: #0c356a;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 8px;
  cursor: pointer;
  margin-top: 20px;
  width: 100px;
  margin-left: auto;
`

const StyledTitle = styled.div`
  margin-bottom: 3.125rem;
  font-size: 1.5625rem;
  font-weight: bold;
`

const DescriptionContainer = styled.div`
  background-color: #f9f9f9;
  padding: 10px;
  border: 1px solid #ddd;
  margin-top: 10px;
  display: none;
`

export default PointShopPage
