import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
  }

  button, input {
    border: none;
    background: none;
  }

  button {
    cursor: pointer;
  }

  input:focus {
    outline: none;
  }

  ul, li {
    list-style: none;
  }

  select {
    border: none;
  }

  select:focus {
    outline: none;
  }

  textarea {
    border: none;
  }

  textarea:focus {
    outline: none;
  }
`