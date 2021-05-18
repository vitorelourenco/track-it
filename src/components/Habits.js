import Header from './Header';
import Menu from './Menu';
import styled from 'styled-components';
import { Add } from 'react-ionicons'

import {useState} from 'react';

import NewHabit from './NewHabbit';
import Habit from './Habit';


export default function Habits(){
  const habitCount = 0;
  const makingNew = true;

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

  
  return (
    <>
      <Header />
      <MainWrapper>

        <header>
          <h2>Meus Hábitos</h2>
          <PlusButton>
            <Add 
              color={"#ffffff"}
            />
          </PlusButton>
        </header>

        {(()=>{
          if (!makingNew) return "";
          return (
            <NewHabit 
              weekDays={weekDays} 
              checkBoxRowState={checkBoxRowState} 
              setCheckBoxRowState={setCheckBoxRowState}
              habitName={habitName}
              setHabitName={setHabitName}
            />
          );
        })()}

        <Habit 
          weekDays={weekDays} 
          checkBoxRowState={[false,true,false,true,false,false,false]} 
          habitName={"banana"}
        />

        {habitCount === 0? <NoHabitsParagraph /> : ""}
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
