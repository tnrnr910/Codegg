import React from "react"
import { styled } from "styled-components"
import { AiOutlineLike } from "react-icons/ai"
import { FaRegComment } from "react-icons/fa"
import { useNavigate } from "react-router"

interface StyledPostTitleProps {
  isBold: boolean
}

function MainpageList({ data }: any) {
  const navigate = useNavigate()

  return (
    <Body>
      <BodyDiv>
        {data.map(
          (item: {
            id: string
            postTitle: string
            postCategory: string
            likes: number
            comments: number
            postSkin: string
          }) => {
            return (
              <ListContainer key={item.id}>
                <ListDiv
                  onClick={() => {
                    navigate(`/detailPage/${item.id}`)
                  }}
                >
                  <ListCategory>{item.postCategory}</ListCategory>
                  <StyledPostTitle isBold={item.postSkin === "bold"}>
                    {item.postTitle}
                  </StyledPostTitle>
                </ListDiv>
                <ListBox>
                  <LikeDiv>
                    <AiOutlineLike size="16px" />
                    {item.likes}
                  </LikeDiv>
                  <div>
                    <FaRegComment size="16px" /> {item.comments}
                  </div>
                </ListBox>
              </ListContainer>
            )
          }
        )}
      </BodyDiv>
    </Body>
  )
}

export default MainpageList

const Body = styled.div`
  width: 35rem;
  border-top: solid #dadada 1px;
`

const BodyDiv = styled.div`
  margin: 0 24px;
  height: 330px;
  font-size: 13px;
`
const ListDiv = styled.div`
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`

const ListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 19px;
`

const ListBox = styled.div`
  display: flex;
  color: #9f9f9f;

  & > div {
    width: 40px;
    display: flex;
    align-items: end;
    gap: 4px;
  }
`

const LikeDiv = styled.div`
  margin-right: 10px;
`

const ListCategory = styled.div`
  width: 40px;
  text-align: center;
  border: solid #e7e7e7 1px;
  padding: 3px;
  color: #9f9f9f;
`

const StyledPostTitle = styled.p<StyledPostTitleProps>`
  font-weight: ${(props) => (props.isBold ? "bold" : "normal")};
`
