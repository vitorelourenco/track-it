import { createGlobalStyle } from 'styled-components';

const GlobalStylesVEL = createGlobalStyle`
  * {
    box-sizing: border-box;
    color: inherit;
  }

  a {
    text-decoration: none;
  }

  strong {
    font-weight: bold;
  }

  .w-100 {
    width: 100%;
  }

  .fw-bold {
    font-weight: bold;
  }

  .d-none {
    display: none;
  }

  .d-block {
    display: block;
  }

  .d-initial {
    display: initial;
  }

  .d-inline-block {
    display: inline-block;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .text-align-left{
    text-align: left;
  }

  .text-align-center{
    text-align: right;
  }

  .text-align-right{
    text-align: right;
  }
`;

export default GlobalStylesVEL;
