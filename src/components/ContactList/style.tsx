import styled from "styled-components"

export const StyledContactList = styled.ul`
  width: 100%;
  height: fit-content;
  padding: 0 20px 0 20px;
  list-style: none;
  overflow-x: scroll;

  display: flex;
  gap: 20px;

  &::-webkit-scrollbar {
    display: none;
  }
`
