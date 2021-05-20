import Header from './Header';
import Menu from './Menu';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext';
import {useContext} from 'react';

export default function History(){
  const {userState} = useContext(UserContext);

  if(localStorage.getItem("user") === null){
    window.location.href="/";
    return "";
  }
  
  return (
    <>
      <Header />
      <MainWrapper>
        <h2>Histórico</h2>
        <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
      </MainWrapper>
      <Menu /> 
    </>
  )
}

const MainWrapper = styled.main`
  background-color: var(--light-grey);
  padding: 80px 18px 115px 18px;
  min-height: 100vh;

  h2 {
    color: var(--dark-blue);
    font-size: 23px;
    line-height: 29px;
  }

  p {
    margin-top: 30px;
    color: #666666;
    font-size: 18px;
    line-height: 22px;
  }
`;
