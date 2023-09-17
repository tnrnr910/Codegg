import React, { useState } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router"

interface MenuItemProps {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}

interface MyPageMenuBarProps {
  activeMenuItem: string
}

function PointShopMenuBar({ activeMenuItem }: MyPageMenuBarProps) {
  const navigate = useNavigate()
  const [selectedItem, setSelectedItem] = useState("") // 선택한 아이템을 저장하는 상태 추가

  const handleMenuItemClick = (path: string) => {
    navigate(path)
  }

  return (
    <MenuBarWrap>
      <MyPageHead>포인트샵</MyPageHead> {/* 페이지 타이틀 변경 */}
      <MenuItem
        active={activeMenuItem === "/PointShopPage"}
        onClick={() => {
          handleMenuItemClick("/PointShopPage")
        }}
      >
        타이틀 효과
      </MenuItem>
      <MenuItem
        active={activeMenuItem === "/MyItemsPage"}
        onClick={() => {
          handleMenuItemClick("/MyItemsPage")
        }}
      >
        내가 구매한 상품
      </MenuItem>
      {/* 아래의 코드는 선택한 아이템에 따라 타이틀 효과를 적용하는 예제입니다. */}
      {selectedItem.length > 0 && (
        <TitleEffect>
          선택한 아이템: {selectedItem}
          <CloseButton
            onClick={() => {
              setSelectedItem("")
            }}
          >
            닫기
          </CloseButton>
        </TitleEffect>
      )}
    </MenuBarWrap>
  )
}

const MenuBarWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16.25rem;
  margin-right: 0.4rem;
  margin-top: 1.875rem;
  width: 9.8125rem;
  border-right: solid 1px #dadada;
`

const MyPageHead = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 2.625rem;
  width: 100%;
  margin-top: 3.5625rem;
`

const MenuItem = styled.div<MenuItemProps>`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 1rem;
  width: 95.4%;
  height: 2.125rem;
  margin-bottom: 1.5rem;
  background-color: ${(props) => (props.active ? "#0C356A" : "transparent")};
  color: ${(props) => (props.active ? "#FFF" : "inherit")};
  font-weight: ${(props) => (props.active ? "bold" : "inherit")};
  padding: 0.25rem;
  border-radius: 0.25rem;
`

const TitleEffect = styled.div`
  background-color: #007bff;
  color: white;
  padding: 8px;
  border-radius: 4px;
  text-align: center;
`

const CloseButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  margin-left: 8px;
  cursor: pointer;
`

export default PointShopMenuBar
