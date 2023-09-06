import styled from "styled-components"

const StyledTitle = styled.div`
  font-size: 25px;
  height: 80px;
`
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  height: 740px;
  width: 926px; // 주어진 너비를 적용
  // height: 683px; // 주어진 높이를 적용
  /* height: 1200px;
  
  position: absolute;
  left: calc(50% -(926 / 2) +2);
  top: calc(10% + 0px); // 50px 아래로 이동 */
  background-color: #f4f4f4;
  border: 1px solid #dadada;
  border-radius: 16px;
  margin-bottom: 40px;
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

  width: 834px;
  height: 50px;

  background-color: #ffffff;
  border: 1px solid #dadada;
  border-radius: 7px;
`

const StyledSelect = styled.select`
  margin-top: 54px;
  margin-bottom: 20px;
  padding: 5px;
  width: 834px;
  height: 50px;

  background: #ffffff;
  border: 1px solid #dadada;
  border-radius: 7px;
`
const StyledSimpleMDE = styled.textarea`
  width: 834px;
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
  margin-top: 20px;
  width: 834px;
  height: 50px;
  background: #ffffff url("/WritePictureIcon.png") no-repeat center;
  border: 1px solid #dadada;
  border-radius: 7px;
`

const CancelButton = styled(StyledButton)`
  color: #000000;
  border: none;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  box-sizing: border-box;
  width: 197px;
  height: 46px;
  float: right;
  background: #ffffff;
  border: 1px solid #dadada;
  border-radius: 4px;
`

const SubmitButton = styled(StyledButton)`
  color: white;
  border: none;
  cursor: pointer;
  width: 197px;
  height: 46px;
  background: #0c356a;
  border: 1px solid #dadada;
  border-radius: 4px;
`

const StyledFileLabel = styled.label`
  position: relative;
  width: 50px;
  margin-bottom: 30px;
`

const FileBtnImg = styled.img`
  position: absolute;
  width: 25px;
  height: 20px;
  left: -380px;
  top: -37px;
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
  FileBtnImg
}
