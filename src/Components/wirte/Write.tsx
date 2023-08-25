import React, { useState } from "react"
import {
  StyledForm,
  StyledLabel,
  StyledInput,
  StyledSelect,
  CancelButton,
  SubmitButton
} from "./WriteCSS"
import * as marked from "marked"
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"

const Write: React.FC = () => {
  const [category, setCategory] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState<File | null>(null)

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value)
  }
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null && e.target.files.length > 0) {
      setImage(e.target.files[0])
    }
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const processedContent = marked.marked(content)
    console.log({ category, title, content: processedContent, image })
  }

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel>
          <StyledSelect value={category} onChange={handleCategoryChange}>
            <option value="">--Please choose an option--</option>
            <option value="news">News</option>
            <option value="updates">Updates</option>
          </StyledSelect>
        </StyledLabel>

        <StyledLabel>
          <StyledInput
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="제목을 입력해주세요."
          />
        </StyledLabel>

        <StyledLabel>
          <SimpleMDE
            value={content}
            onChange={(value) => {
              setContent(value)
            }}
            placeholder="내용을 입력해주세요."
          />
        </StyledLabel>

        <input type="file" accept="image/*" onChange={handleImageChange} />
      </StyledForm>
      <CancelButton type="button">Cancel</CancelButton>
      <SubmitButton type="submit">Submit</SubmitButton>
    </>
  )
}

export default Write
