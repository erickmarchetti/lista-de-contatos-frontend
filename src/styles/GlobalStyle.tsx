import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
    * {
      margin: 0;
      /* padding: 0;
      border: 0;
      outline: 0; */
    }

    html, body, #root {
      width: 100vw;
      height: 100vh;
    }

    /* .ant-modal-footer {
      display: none;
    } */
    
    /* button {
      cursor: pointer;
    }

    a {
      text-decoration: none;
    }

    ul, ol, li {
      list-style: none;
    } */
`

export default GlobalStyle
