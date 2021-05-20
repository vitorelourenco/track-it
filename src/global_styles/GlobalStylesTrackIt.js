import { createGlobalStyle } from 'styled-components';

const GlobalStylesTrackIt = createGlobalStyle`
  :root{
    --dark-blue: #126ba5;
    --light-blue: #52b6ff;
    --dark-grey: #cfcfcf;
    --light-grey: #f2f2f2;
    --light-green: #8fc549;
    --logo-font: 'Playball', cursive;
    --body-font: 'Lexend Deca', sans-serif;
  }

  body {
    font-family: var(--body-font);
  }

  main{
    height: calc(100vh - 57px - 62px);
    margin-top: 57px;
    margin-bottom: 62px;
    overflow-Y: scroll;
  }
`;

export default GlobalStylesTrackIt;
