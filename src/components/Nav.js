import styled from 'styled-components';
import logout from '../functions/logout';

export default function Nav(props){
  return (
    <Navbar onClick={logout} isShowing={props.isShowing}>
      <p>LogOut</p>
    </Navbar>
  );
}

const Navbar = styled.nav`
  display: ${({isShowing})=>isShowing?"flex":"none"};
  height: 30px;
  box-shadow: 0 0 4px 4px rgba(0,0,0,0.3);
  position: absolute;
  background-color: white;
  border-radius: 10px;
  padding: 0 5px 3px 5px;
  cursor: pointer;
  right: 70px;
  top: 14px;
  font-size: 14px;
  align-items: center;
  &:hover{
    color: red;
  }
`;