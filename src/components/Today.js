import Header from './Header';
import Menu from './Menu';
import styled from 'styled-components';
import DailyHabitCard from './DailyHabitCard';
import UserContext from '../contexts/UserContext';
import {useContext, useEffect, useState} from 'react';
import axios from 'axios';

export default function Today(){
  const {userState, setUserState} = useContext(UserContext);
  const [todaysHabits, setTodaysHabits] = useState([]);

  useEffect(()=>{
    if(
      typeof(userState) !== "object"
      || !userState.hasOwnProperty("token")
    ) return;

    const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
    const config = {
      headers: {
        Authorization: `Bearer ${userState.token}`
      }
    }
    axios
      .get(url, config)
      .then(({data})=>{
        setTodaysHabits(data);
      })
      .catch(()=>{
        console.log('today.js')
        alert('Deu ruim');
      });
  },[userState]);

  return (
    <>
      <Header />
      <MainWrapper>
        {todaysHabits.map(({id,name,done,currentSequence,highestSequence})=>(
          <DailyHabitCard
            key={id}
            habitId={id}
            name={name}
            done={done}
            currentSequence={currentSequence}
            highestSequence={highestSequence}
            state={done}
            setState={()=>null}
          />
        ))}
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
