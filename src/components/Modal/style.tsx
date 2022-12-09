import styled from "styled-components"

export const StyledModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;

  background-color: rgba(0, 0, 0, 0.45);

  .Modal__body {
    display: flex;
    flex-flow: column nowrap;

    width: 100%;
    height: fit-content;
    max-width: 464.5px;
    padding: 30px;
    border-radius: 8px;
    border: 1px solid #f0f0f0;
    position: relative;

    background-color: white;

    .ant-input-group-addon {
      padding: 0;
    }
    .anticon.anticon-plus {
      width: 37px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .ant-list-item {
      cursor: pointer;
      background-color: white;
      transition: 0.2s;
    }
    .ant-list-item:hover {
      filter: brightness(0.95);
    }
  }
`

export const FlexContainerModal = styled.div`
  width: 100%;
  display: flex;
  gap: 30px;
  margin-bottom: 20px;

  .ant-list-items {
    max-height: 156px;
    overflow-y: scroll;
  }
  .ant-list-items::-webkit-scrollbar {
    display: none;
  }
`
