import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
    * {
      margin: 0;
    }

    html, body, #root {
      width: 100vw;
      height: 100vh;
    }

    a {
      text-decoration: none;
    }
`

export default GlobalStyle
