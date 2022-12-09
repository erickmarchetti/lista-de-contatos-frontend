import styled from "styled-components"

export const StyledContactList = styled.ul`
  width: 100%;
  height: fit-content;
  padding: 0;
  list-style: none;
  overflow-x: scroll;

  display: flex;
  gap: 20px;

  &::-webkit-scrollbar {
    display: none;
  }
`
