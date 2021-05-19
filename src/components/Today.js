import Header from './Header';
import Menu from './Menu';
import styled from 'styled-components';
import DailyHabitCard from './DailyHabitCard';
import UserContext from '../contexts/UserContext';
import {useContext, useEffect, useState} from 'react';
import axios from 'axios';

export default function Today(){
  const {userState, setUserState} = useContext(UserContext);
  const [habits, setHabits] = useState([]);

  useEffect(()=>{
    if(
      typeof(userState) !== "object"
      || !userState.hasOwnProperty("token")
    ) return;

    const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
    const config = {
      headers: {
        Authorization: `Bearer ${userState.token}`
      }
    }
    axios
      .get(url, config)
      .then(({data})=>{
        setHabits(data);
      })
      .catch(()=>{
        alert('Deu ruim');
      });
  },[userState]);

  return (
    <>
      <Header />
      <MainWrapper>
        <DailyHabitCard
          name={"banana"}
          sequence={3}
          record={3}
          setState={()=>null}
        >
        </DailyHabitCard>

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
`;
