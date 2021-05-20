import styled from 'styled-components';
import logout from '../functions/logout';

export default function Nav(props){
  return (
    <Navbar isShowing={props.isShowing}>
      <p onClick={logout}>LogOut</p>
    </Navbar>
  );
}

const Navbar = styled.nav`
  display: ${({isShowing})=>isShowing?"initial":"none"};
  position: absolute;
  background-color: white;
  border-radius: 10px;
  padding: 0 5px 3px 5px;
  cursor: pointer;
  right: 70px;
  top: 20px;
  &:hover{
    color: red;
  }
`;