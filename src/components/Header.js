import styled from 'styled-components';

export default function Header(){
  return (
    <HeaderWrapper>
      <span>TrackIt</span>
      <picture>
        <img alt="profile" src="https://i.ytimg.com/vi/oxWAdNupoFc/maxresdefault.jpg" />
      </picture>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  --height-of-content: 39px;

  background-color: var(--dark-blue);
  display: flex;
  justify-content: space-between;
  padding: 9px 18px; 
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  span{
    font-size: var(--height-of-content);
    font-family: var(--logo-font);
    color: white;
    cursor: pointer;
  }

  picture {
    width: var(--height-of-content);
    height: var(--height-of-content);
    border-radius: 50%;
    overflow: hidden;
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;