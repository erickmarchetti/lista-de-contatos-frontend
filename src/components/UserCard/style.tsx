import styled from "styled-components"

export const StyledCard = styled.div`
  display: flex;
  flex-flow: column nowrap;

  width: 100%;
  height: fit-content;
  max-width: 350px;
  max-height: 400px;
  margin-top: 20px;
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
  justify-content: space-between;
  gap: 30px;

  .ant-list-items {
    max-height: 226px;
    overflow-y: scroll;
  }
  .ant-list-items::-webkit-scrollbar {
    display: none;
  }
`

export const FlexContainerModal = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
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

export const Modal = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.45);

  .Modal__body {
    display: flex;
    flex-flow: column nowrap;

    width: 100%;
    height: fit-content;
    max-width: 360px;
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
  }
`
