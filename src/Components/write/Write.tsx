import React, { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import "easymde/dist/easymde.min.css"
import { storage, db } from "../../axios/firebase"
import { doc, setDoc } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import {
  StyledForm,
  StyledLabel,
  StyledInput,
  StyledSelect,
  StyledSimpleMDE,
  UploadIcon,
  StyledInputFile,
  CancelButton,
  SubmitButton
} from "./WriteCSS"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useNavigate, useParams } from "react-router"

const Write: React.FC = () => {
  const { board } = useParams()
  const auth = getAuth()
  const navigate = useNavigate()
  const [category, setCategory] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>("")

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        console.log(user.email)
        setUserEmail(user.email)
      } else {
        navigate("/")
      }
    })
  }, [])

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value)
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file !== undefined) {
      setImageFile(file) // 파일 선택 시 상태에 저장
    }
  }

  const handleSubmitPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // 페이지 리프레쉬 방지

    if (imageFile !== null) {
      // 이미지 파일이 선택된 경우
      const fileRef = ref(storage, imageFile.name)

      uploadBytesResumable(fileRef, imageFile)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((downloadURL) => {
              savePost(downloadURL) // 사진 업로드 후 포스트 저장
            })
            .catch((e) => {
              console.log("error")
            })
        })
        .catch((error) => {
          console.error("Upload failed:", error)
        })
    } else {
      savePost(null) // 사진 없이 포스트 저장
    }
  }

  function savePost(imageUrl: string | null) {
    setDoc(doc(db, "posts", new Date().getTime().toString()), {
      postCategory: category,
      postTitle: title,
      postContent: content,
      postImgUrl: imageUrl ?? null,
      postBoard: board,
      postTime: new Date(),
      postUserEmail: userEmail,
      postDisplayName: ""
    })
      .then(() => {
        alert("글 작성이 완료되었습니다.")
        navigate("/")
      })
      .catch((e) => {
        console.error("글 작성에 실패했습니다.:", e)
      })
  }

  return (
    <>
      <StyledForm onSubmit={handleSubmitPost}>
        <StyledLabel>
          <StyledSelect value={category} onChange={handleCategoryChange}>
            <option value="">카테고리를 선택하세요</option>
            <option value="Vanilla JS">Vanilla JS</option>
            <option value="React">React.js</option>
            <option value="Node">Node.js</option>
            <option value="Next">Next.js</option>
            <option value="Python">Python</option>
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
          <StyledSimpleMDE
            value={content}
            onChange={(value) => {
              setContent(value)
            }}
            placeholder="내용을 입력해주세요."
          />
        </StyledLabel>
        <ReactMarkdown>{content}</ReactMarkdown>

        <UploadIcon
          onClick={() => {
            document.getElementById("file-upload")?.click()
          }}
        />
        <StyledInputFile
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <CancelButton type="button">Cancel</CancelButton>
        <SubmitButton type="submit">Submit</SubmitButton>
      </StyledForm>
    </>
  )
}

export default Write
