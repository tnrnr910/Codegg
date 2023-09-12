import React, { useState } from "react"
import styled from "styled-components"
import PointShopMenuBar from "../Components/PointShopMenuBar"

interface ShopItem {
  id: number
  name: string
  price: number
}

const PointShopPage: React.FC = () => {
  const [userPoints, setUserPoints] = useState(2000)
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null)

  const items: ShopItem[] = [
    { id: 1, name: "게시글 타이틀 볼드체 변경", price: 100 },
    { id: 2, name: "게시글 타이틀 색상 변경 - 주황", price: 300 },
    { id: 3, name: "게시글 타이틀 색상 변경 - 빨강", price: 300 },
    { id: 4, name: "게시글 타이틀 사이즈 변경 - 15pt", price: 200 },
    { id: 5, name: "게시글 타이틀 색상 변경 - 초록", price: 100 },
    { id: 6, name: "게시글 타이틀 색상 변경 - 파랑", price: 150 },
    { id: 7, name: "게시글 타이틀 폰트 변경 - 나눔고딕", price: 200 }
  ]

  const handleItemSelect = (item: ShopItem) => {
    if (userPoints >= item.price) {
      setSelectedItem(item)
      setUserPoints(userPoints - item.price)
    } else {
      alert("포인트가 부족합니다.")
    }
  }

  // useEffect(() => {
  //   // 여기에 아이템을 구매했을 때 타이틀 효과를 적용하는 로직을 추가할 수 있습니다.
  //   // selectedItem에 선택한 아이템이 저장되어 있으므로, 이를 활용하여 타이틀 효과를 적용하세요.
  // }, [])

  return (
    <PointShopWrap>
      <PointShopMenuBar activeMenuItem={""} />
      <ShopContainer>
        <h1>포인트샵</h1>
        <p>보유 포인트: {userPoints}</p>

        <ItemList>
          {items.map((item) => (
            <Item key={item.id}>
              <ItemName>{item.name}</ItemName>
              <ItemPrice>{item.price} 포인트</ItemPrice>
              <BuyButton
                onClick={() => {
                  handleItemSelect(item)
                }}
                disabled={selectedItem === item}
              >
                {selectedItem === item ? "선택됨" : "구매"}
              </BuyButton>
            </Item>
          ))}
        </ItemList>
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
  list-style: none;
  padding: 0;
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

const BuyButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`

export default PointShopPage
