import styled from "styled-components"

const StyledDropzone = styled.div`
  height: 50px;
  width: 100%;
  text-align: center;
`

const StyledTitle = styled.div`
  font-size: 25px;
  height: 80px;
`
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  min-height: 740px;
  width: 920px; // 주어진 너비를 적용
  // height: 683px; // 주어진 높이를 적용
  /* height: 1200px;
  
  position: absolute;
  left: calc(50% -(926 / 2) +2);
  top: calc(10% + 0px); // 50px 아래로 이동 */
  background-color: #f4f4f4;
  border: 1px solid #dadada;
  border-radius: 16px;
  padding-bottom: 30px;
  margin-bottom: 20px;
`

const StyledLabel = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  margin-top: 12px;
`

const StyledInput = styled.input`
  margin-bottom: 20px;
  padding: 5px;

  box-sizing: border-box;

  width: 830px;
  height: 50px;

  background-color: #ffffff;
  border: 1px solid #dadada;
  border-radius: 7px;
`

const StyledSelect = styled.select`
  margin-top: 54px;
  margin-bottom: 20px;
  padding: 5px;
  width: 830px;
  height: 50px;

  background: #ffffff;
  border: 1px solid #dadada;
  border-radius: 7px;
`
const StyledSimpleMDE = styled.textarea`
  width: 830px;
  height: 298px;
  resize: none;

  .easymde-container .CodeMirror {
    height: auto;
    min-height: 298px;
    border: none;
    border-radius: 7px;
    box-sizing: border-box;
    background-color: #ffffff;
    border: 1px solid #dadada;
  }
`

const StyledButton = styled.button`
  width: 100px;
`

const StyledInputFile = styled.input`
  display: none;
`

const UploadIcon = styled.label`
  width: 830px;
  height: 250px;
  background: #ffffff url("/WritePictureIcon.png") no-repeat center;
  border: 1px solid #dadada;
  border-radius: 7px;
  text-align: center;
  margin-bottom: 20px;
`

const Buttons = styled.div`
  width: 830px;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 10px;
`

const CancelButton = styled(StyledButton)`
  color: #000000;
  background: #ffffff;
  border: 1px solid #dadada;
  border-radius: 4px;
  box-sizing: border-box;
  width: 197px;
  height: 46px;
  cursor: pointer;
`

const SubmitButton = styled(StyledButton)`
  color: white;
  background: #0c356a;
  border: 1px solid #dadada;
  border-radius: 4px;
  box-sizing: border-box;
  width: 197px;
  height: 46px;
  cursor: pointer;
`

const StyledFileLabel = styled.label`
  position: relative;
  width: 50px;
  margin: 10px;
`

const FileBtnImg = styled.img`
  width: 25px;
  height: 20px;
`

const DropzoneP = styled.p`
  width: 100%;
  margin-bottom: 10px;
  margin-top: 10px;
`

export {
  StyledTitle,
  StyledForm,
  StyledLabel,
  StyledInput,
  StyledSimpleMDE,
  StyledSelect,
  UploadIcon,
  StyledInputFile,
  CancelButton,
  SubmitButton,
  StyledFileLabel,
  FileBtnImg,
  StyledDropzone,
  DropzoneP,
  Buttons
}
