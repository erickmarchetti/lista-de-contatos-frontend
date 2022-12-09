import styled from "styled-components"

export const StyledForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 10px;

  .input__span--error {
    padding-left: 6px;
    color: #ff4d4f;
  }
`

export const FlexContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
