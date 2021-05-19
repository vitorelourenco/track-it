import styled from 'styled-components';
import {CheckmarkOutline} from 'react-ionicons';
import UserContext from '../contexts/UserContext';
import {useContext, useState, useEffect} from 'react';
import axios from 'axios';
import LoadingCover from './LoadingCover';

export default function DailyHabitCard(props){
  const {habitId, name, currentSequence, highestSequence,done, todaysHabits} = props;
  
  const {userState, setUserState} = useContext(UserContext);

  const [isInteractive, setIsInteractive] = useState(true);

  function toggleCard(){
    setIsInteractive(false);
    const command = done ? "uncheck" : "check";
    const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitId}/${command}`;
    const body = {};
    const config = {
      headers: {
        Authorization: `Bearer ${userState.token}`
      }
    }
    axios
    .post(url, body, config)
    .then(()=>{
      setUserState({...userState});
    })
    .catch(()=>{
      console.log('Deu ruim')
    });
  }

  useEffect(()=>{
    setIsInteractive(true);
  },[todaysHabits])

  return (
    <CardWrapper 
    currentSequence={currentSequence} 
    highestSequence={highestSequence} 
    done={done}
    >
      <LoadingCover isInteractive={isInteractive} rgba="rgba(120,120,120,0.5)"/>
      <section onClick={isInteractive ? toggleCard : (()=>undefined)}>
        <div className="daily-habit-check-box" ><CheckmarkOutline /></div>
        <h3>{name}</h3>
        <p>Sequência atual: <em className="currentSequence">{currentSequence} dias</em></p>
        <p>Seu recorde: <em className="highestSequence">{highestSequence} dias</em></p>
      </section>
    </CardWrapper>
  );
}
const CardWrapper = styled.div`
  position: relative;
  background-color: white;
  color: #666666;
  border-radius: 5px;
  padding: 13px;
  cursor: pointer;

  h3{
    font-size: 20px;
    line-height: 25px;
    margin-bottom: 10px;
  }

  p{
    font-size: 13px;
    line-height: 16px;
    margin-top: 0;
  }

  em.currentSequence{
    color: ${props=>props.done===false?"inherit":"var(--light-green)"};
  }

  em.highestSequence{
    color: ${({currentSequence, highestSequence})=>currentSequence!==highestSequence?"inherit":"var(--light-green)"};
  }
  
  .daily-habit-check-box{
    float: right;
    height: 100%;
    width: 70px;
    background-color: ${props=>props.done===false?"#e7e7e7":"var(--light-green)"};
    border-radius: 5px;

    svg{
      width: 93%;
      height: 93%;
      color: white;
    }
  }
`;
