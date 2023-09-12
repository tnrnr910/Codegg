import React, { useEffect, useState } from "react"
// import ReactMarkdown from "react-markdown"
import "easymde/dist/easymde.min.css"
import { storage, db } from "../../axios/firebase"
import { addDoc, collection } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import {
  StyledTitle,
  StyledForm,
  StyledLabel,
  StyledInput,
  StyledSelect,
  StyledSimpleMDE,
  UploadIcon,
  StyledInputFile,
  CancelButton,
  SubmitButton,
  StyledFileLabel,
  DropzoneP,
  FileBtnImg
} from "./WriteCSS"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useNavigate, useParams } from "react-router"
import Dropzone from "react-dropzone"

const Write: React.FC = () => {
  const { board } = useParams()
  const auth = getAuth()
  const navigate = useNavigate()
  const [category, setCategory] = useState<string>("카테고리를 선택하세요")
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [imageFile, setImageFile] = useState<File | null>(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        console.log(user.email)
      } else {
        navigate(-1)
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

  const cancelBtn = () => {
    navigate(-1)
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
    if (category !== "카테고리를 선택하세요") {
      if (title !== "") {
        if (content !== "") {
          addDoc(collection(db, "posts"), {
            postCategory: category,
            postTitle: title,
            postContent: content,
            postImgUrl: imageUrl ?? null,
            postBoard: board,
            postTime: new Date().getTime(),
            postUserEmail: auth.currentUser?.email,
            postDisplayName: auth.currentUser?.displayName,
            likes: 0,
            comments: 0
          })
            .then(() => {
              // alert("글 작성이 완료되었습니다.")
              navigate(-1)
            })
            .catch((e) => {
              console.error("글 작성에 실패했습니다.:", e)
              navigate(-1)
            })
        } else {
          alert("내용을 작성해 주세요")
        }
      } else {
        alert("제목을 작성해 주세요")
      }
    } else {
      alert("카테고리를 설정해 주세요")
    }
  }

  return (
    <>
      <StyledTitle>게시글 작성</StyledTitle>
      <StyledForm onSubmit={handleSubmitPost}>
        <StyledLabel>
          <StyledSelect value={category} onChange={handleCategoryChange}>
            <option value="">카테고리를 선택하세요</option>
            <option value="JS">JS</option>
            <option value="React">React.js</option>
            <option value="Node">Node.js</option>
            <option value="Next">Next.js</option>
            <option value="Python">Python</option>
            <option value="기타">기타</option>
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
            onChange={(e) => {
              setContent(e.target.value)
            }}
            placeholder="내용을 입력해주세요."
          />
        </StyledLabel>
        {/* <ReactMarkdown>{content}</ReactMarkdown> */}
        <StyledFileLabel htmlFor="file-upload">
          <StyledInputFile
            id="file-upload"
            name="fifle-upload"
            type="file"
            accept="image/jpeg,image/jpg"
            onChange={handleImageUpload}
          />
          <FileBtnImg src="/WritePicturIcon.png" alt="업로드 파일" />
        </StyledFileLabel>
        <UploadIcon>
          <Dropzone
            onDrop={(acceptedFiles) => {
              // 파일이 드롭존에 드롭되면 이벤트 핸들러 실행
              console.log(acceptedFiles)
              if (acceptedFiles.length > 0) {
                // 파일이 선택된 경우
                setImageFile(acceptedFiles[0]) // 첫 번째 파일을 상태에 저장
              }
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <DropzoneP>
                    파일을 드래그 앤 드롭하거나 클릭하여 업로드하세요.
                  </DropzoneP>
                  {/* 이미지 미리보기 */}
                  {imageFile != null && (
                    <img
                      src={URL.createObjectURL(imageFile)}
                      alt="미리보기 이미지"
                      style={{ maxWidth: "100%", maxHeight: "200px" }} // 이미지 크기 조절 가능
                    />
                  )}
                </div>
              </section>
            )}
          </Dropzone>
        </UploadIcon>

        <div>
          <CancelButton type="button" onClick={cancelBtn}>
            Cancel
          </CancelButton>
          <SubmitButton type="submit">Submit</SubmitButton>
        </div>
      </StyledForm>
    </>
  )
}

export default Write
