import React from "react"
import { styled } from "styled-components"

interface categoryOpen {
  categorySelected: string
  categoryOpen: boolean
  setCategoryOpen: React.Dispatch<React.SetStateAction<boolean>>
  setCategorySelected: React.Dispatch<React.SetStateAction<string>>
}
function DropDown({
  categorySelected,
  categoryOpen,
  setCategoryOpen,
  setCategorySelected
}: categoryOpen) {
  return (
    <StyledCategoryDropdown open={categoryOpen}>
      <StyledCategoryList>
        <StyledCategoryItem
          onClick={() => {
            setCategorySelected("카테고리")
            setCategoryOpen(false)
          }}
          selected={categorySelected === "카테고리"}
        >
          카테고리
        </StyledCategoryItem>
        <StyledCategoryItem
          onClick={() => {
            setCategorySelected("JS")
            setCategoryOpen(false)
          }}
          selected={categorySelected === "JS"}
        >
          JS
        </StyledCategoryItem>
        <StyledCategoryItem
          onClick={() => {
            setCategorySelected("React")
            setCategoryOpen(false)
          }}
          selected={categorySelected === "React"}
        >
          React
        </StyledCategoryItem>
        <StyledCategoryItem
          onClick={() => {
            setCategorySelected("Node")
            setCategoryOpen(false)
          }}
          selected={categorySelected === "Node"}
        >
          Node
        </StyledCategoryItem>
        <StyledCategoryItem
          onClick={() => {
            setCategorySelected("Next")
            setCategoryOpen(false)
          }}
          selected={categorySelected === "Next"}
        >
          Next
        </StyledCategoryItem>
        <StyledCategoryItem
          onClick={() => {
            setCategorySelected("파이썬")
            setCategoryOpen(false)
          }}
          selected={categorySelected === "파이썬"}
        >
          파이썬
        </StyledCategoryItem>
        <StyledCategoryItem
          onClick={() => {
            setCategorySelected("기타")
            setCategoryOpen(false)
          }}
          selected={categorySelected === "기타"}
        >
          기타
        </StyledCategoryItem>
      </StyledCategoryList>
    </StyledCategoryDropdown>
  )
}

export default DropDown

const StyledCategoryDropdown = styled.div<{ open: boolean }>`
  position: absolute;
  top: ${({ open }) => (open ? "33%" : "-12.5rem")};
  transition: top 0.3s ease;
  z-index: 1;
  width: 5%;
`

const StyledCategoryList = styled.ul`
  list-style: none;
  margin: 0; /* 수정 */
  padding: 0; /* 추가 */
  background-color: #ffffff;
  border: 1px solid #e7e7e7; /* 추가 */
`

const StyledCategoryItem = styled.li<{ selected: boolean }>`
  cursor: pointer;
  border: none;
  border-top: 1px solid #e7e7e7; /* 추가 */
  padding: 8px 12px; /* 수정 */
  background-color: ${(props) => (props.selected ? "#f0f0f0" : "transparent")};
  transition: background-color 0.3s ease; /* 추가 */
  &:first-child {
    border-top: none; /* 추가 */
  }
  &:hover {
    background-color: #f0f0f0; /* 추가 */
  }
`
