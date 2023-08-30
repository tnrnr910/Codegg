import styled from "styled-components"

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 10px;
`

const StyledLabel = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`

const StyledInput = styled.input`
  margin-bottom: 20px;
  padding: 5px;
`

const StyledSelect = styled.select`
  margin-bottom: 20px;
  padding: 5px;
`

const StyledTextArea = styled.textarea`
  margin-bottom: 20px;
  padding: 5px;
  resize: vertical;
  min-height: 200px;
  max-height: 500px;
`

const StyledButton = styled.button`
  width: 100px;
`

const CancelButton = styled(StyledButton)`
  background-color: #f44336;
  color: #fff;
  border: none;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`

const SubmitButton = styled(StyledButton)`
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 5px;
`

export {
  StyledForm,
  StyledLabel,
  StyledInput,
  StyledSelect,
  StyledTextArea,
  CancelButton,
  SubmitButton
}
