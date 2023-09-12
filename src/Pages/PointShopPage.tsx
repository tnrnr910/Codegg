/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState } from "react"
import styled from "styled-components"

function PointShopPage() {
  const [userPoints, setUserPoints] = useState(1000)
  const [selectedItem, setSelectedItem] = useState("")
  const [pageTitle, setPageTitle] = useState("기본 타이틀")

  const items = [
    { name: "Font A", price: 100 },
    { name: "Font B", price: 150 },
    { name: "Font C", price: 200 }
  ]

  const handleItemSelect = (item: { name: any; price: any }) => {
    if (userPoints >= item.price) {
      setSelectedItem(item.name)
      setUserPoints(userPoints - item.price)
      // 여기에서 페이지 타이틀을 변경합니다. 예를 들어, 선택한 아이템 이름으로 변경합니다.
      setPageTitle(item.name)
    } else {
      alert("포인트가 부족합니다.")
    }
  }

  return (
    <div>
      <h1>포인트샵</h1>
      <p>사용 가능한 포인트: {userPoints}</p>
      <ul>
        {items.map((item) => (
          <Item key={item.name}>
            {item.name} - {item.price} 포인트
            <Button
              onClick={() => {
                handleItemSelect(item)
              }}
              disabled={selectedItem === item.name}
            >
              {selectedItem === item.name ? "선택됨" : "구매"}
            </Button>
          </Item>
        ))}
      </ul>

      {/* 선택한 폰트를 페이지 타이틀에 적용 */}
      <PageTitle>{pageTitle}</PageTitle>
    </div>
  )
}

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

const Button = styled.button`
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

const PageTitle = styled.h2`
  font-family: ${(props) => props.theme.pageFont || "Arial, sans-serif"};
`

export default PointShopPage
