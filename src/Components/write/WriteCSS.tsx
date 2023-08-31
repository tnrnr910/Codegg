import styled from "styled-components"

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;

  width: 926px; // 주어진 너비를 적용
  height: 633px; // 주어진 높이를 적용

  position: absolute;
  left: calc(50% -(926 / 2) +2);
  top: calc(20% + 0px); // 50px 아래로 이동
  background-color: #f4f4f4;
  border: 1px solid #dadada;
  border-radius: 16px;
`

const StyledLabel = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
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
  margin-top: 30px;
  margin-bottom: 20px;
  padding: 5px;
  width: 834px;
  height: 50px;

  background: #ffffff;
  border: 1px solid #dadada;
  border-radius: 7px;
`
const StyledTextArea = styled.textarea`
  width: 834px;
  height: 298px;

  padding: 10px;

  box-sizing: border-box;

  background-color: #ffffff;
  border: 1px solid #dadada;
  border-radius: 7px;
`

const StyledButton = styled.button`
  width: 100px;
`

const StyledInputFile = styled.input`
  display: none;
`

const UploadIcon = styled.label`
  margin-top: 40px;
  width: 834px;
  height: 50px;
  background: #ffffff url(${process.env.PUBLIC_URL + "/WritePictureIcon.png"})
    no-repeat center;

  border: 1px solid #dadada;
  border-radius: 7px;
`

const CancelButton = styled(StyledButton)`
  color: #000000;
  border: none;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 5px;
  margin-bottom: 10 px;
  box-sizing: bo rder-box;
  position: abs olute;
  width: 197px;
  height: 46px;
  left: 520px;
  top: 737px;
  background: #ffffff;
  border: 1px solid #dadada;
  border-radius: 4px;
`

const SubmitButton = styled(StyledButton)`
  color: white;
  border: none;
  cursor: pointer;
  position: absolute;
  width: 197px;
  height: 46px;
  left: 726px;
  top: 737px;
  background: #0c356a;
  border: 1px solid #dadada;
  border-radius: 4px;
`

export {
  StyledForm,
  StyledLabel,
  StyledInput,
  StyledTextArea,
  StyledSelect,
  UploadIcon,
  StyledInputFile,
  CancelButton,
  SubmitButton
}
