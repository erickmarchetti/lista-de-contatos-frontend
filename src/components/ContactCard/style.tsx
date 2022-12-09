import styled from "styled-components"

export const StyledCard = styled.div`
  display: flex;
  flex-flow: column nowrap;

  min-width: 446.35px;
  height: fit-content;
  max-height: 400px;
  margin: 10px 0 10px 0;
  border-radius: 8px;
  overflow: hidden;
  transition: 0.2s;

  border: 1px solid #f0f0f0;

  &:hover {
    transform: scale(1.01);
  }

  .Card__head {
    height: 59px;
    width: 100%;
    text-transform: capitalize;
    font-size: 17px;
    font-weight: bold;
    padding: 0 20px 0 20px;
    overflow: hidden;

    display: flex;
    align-items: center;

    background-color: #4096ff;
    color: white;
  }

  .Card__body {
    display: flex;
    flex-flow: column nowrap;
    height: fit-content;
    max-height: 341px;
    padding: 20px;
  }
`

export const FlexContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 30px;

  .ant-list-items {
    max-height: 226px;
    overflow-y: scroll;
  }
  .ant-list-items::-webkit-scrollbar {
    display: none;
  }
`
