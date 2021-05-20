import styled from 'styled-components';
import UserContext from '../contexts/UserContext';
import {useContext} from 'react';
import Nav from './Nav';
import NavContext from '../contexts/NavContext';

export default function Header(){

  const {userState} = useContext(UserContext);
  const {navState, setNavState} = useContext(NavContext);
  return (
    <HeaderWrapper>
      <span>TrackIt</span>
      <Nav isShowing={navState}/>
      <picture onClick={()=>setNavState(!navState)}>
        <img alt="profile" src={(typeof(userState)==="object" && userState.image) || ""} />
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
  z-index: 100;

  span{
    font-size: var(--height-of-content);
    font-family: var(--logo-font);
    color: white;
    cursor: default;
  }

  picture {
    width: var(--height-of-content);
    height: var(--height-of-content);
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;