import styled from 'styled-components';
import {CheckmarkOutline} from 'react-ionicons';

export default function DailyHabitCard(props){
  const {name, currentSequence, highestSequence, setState} = props;
  return (
    <CardWrapper onClick={setState}>
      <div><CheckmarkOutline /></div>
      <h3>{name}</h3>
      <p>Sequência atual: <em>{currentSequence} dias</em></p>
      <p>Seu recorder: <em>{highestSequence} dias</em></p>

    </CardWrapper>
  );
}
const CardWrapper = styled.div`
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

  em{
    color: ${props=>props.state===false?"inherit":"var(--light-green)"};
  }
  
  div{
    float: right;
    height: 100%;
    width: 70px;
    background-color: ${props=>props.state===false?"#e7e7e7":"var(--light-green)"};
    border-radius: 5px;

    svg{
      width: 93%;
      height: 93%;
      color: white;
    }
  }
`;
