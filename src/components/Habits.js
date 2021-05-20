import Header from './Header';
import Menu from './Menu';
import styled from 'styled-components';
import { Add } from 'react-ionicons'

import {useEffect, useState} from 'react';

import NewHabit from './NewHabbit';
import Habit from './Habit';

import UserContext from '../contexts/UserContext';
import {useContext} from 'react';
import axios from 'axios';

import { useHistory } from 'react-router-dom';

export default function Habits(){

  const weekDays = [
    {char:"D", id:0},
    {char:"S", id:1},
    {char:"T", id:2},
    {char:"Q", id:3},
    {char:"Q", id:4},
    {char:"S", id:5},
    {char:"S", id:6}
  ];

  const [checkBoxRowState, setCheckBoxRowState] = useState(Array(weekDays.length).fill(false));
  const [habitName, setHabitName] = useState("");
  const [makingNewHabit, setMakingNewHabit] = useState(false);
  const [habits, setHabits] = useState([]);
  const {userState} = useContext(UserContext);

  useEffect(()=>{
    if(
      typeof(userState) !== "object"
      || !userState.hasOwnProperty("token")
    ) return;

    const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
    const config = {
      headers:{
        Authorization: `Bearer ${userState.token}`
      }
    }
    axios
      .get(url,config)
      .then(({data})=>{
        setHabits(data);
      })
      .catch(()=>{
        console.log('habits.ks')
        alert('Deu ruim');
      });
  },[userState]);



  return (
    <>
      <Header />
      <MainWrapper>

        <header>
          <h2>Meus Hábitos</h2>
          <PlusButton onClick={()=>setMakingNewHabit(true)}>
            <Add color={"#ffffff"} />
          </PlusButton>
        </header>

        {!makingNewHabit
          ? ""
          : (
            <NewHabit 
              habits={habits}
              weekDays={weekDays} 
              checkBoxRowState={checkBoxRowState} 
              setCheckBoxRowState={setCheckBoxRowState}
              habitName={habitName}
              setHabitName={setHabitName}
              setMakingNewHabit={setMakingNewHabit}
            />
          )
        }

        {habits.map(habit=>{
          const checkBoxRowState = Array(weekDays.length).fill(false);
          habit.days.forEach((day)=>{checkBoxRowState[day]=true});

          return (
            <Habit 
              habits={habits}
              key={habit.id}
              weekDays={weekDays} 
              checkBoxRowState={checkBoxRowState} 
              habitName={habit.name}
              id={habit.id}
            />
          );
        })}
        {habits.length === 0? <NoHabitsParagraph /> : ""}
      </MainWrapper>
      <Menu /> 
    </>
  )
}

function NoHabitsParagraph(){
  return (
    <p>
      Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
    </p>
  );
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

  header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  p {
    margin-top: 30px;
    color: #666666;
    font-size: 18px;
    line-height: 22px;
  }
`;

const PlusButton = styled.button`
  border-radius: 5px;
  padding-top: 6px;
  width: 40px;
  height: 35px;
  border: none;
  font-size: 20px;
  color: white;
  background-color: var(--light-blue);
  cursor: pointer;
  opacity: ${(props)=>props.disabled?0.7:1};
`;
