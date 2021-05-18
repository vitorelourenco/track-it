import CheckBox from './CheckBox';
import styled from 'styled-components';
import {TrashOutline} from 'react-ionicons';

export default function NewHabit(props){
  const {weekDays} = props;
  const {checkBoxRowState} = props;
  const {habitName} = props;

  return (
    <HabbitWrapper>
      <TrashWrapper>
        <TrashOutline />
      </TrashWrapper>
      <span>{habitName}</span>
      <WeekDays>
        {weekDays.map(({char, id}, i)=>
          <CheckBox 
            key={id}
            index={i}
            state={checkBoxRowState}
            char={char}
            disabled={true}
          />
        )}
      </WeekDays>
    </HabbitWrapper>
  );
}


const HabbitWrapper = styled.article`
  background-color: white;
  border-radius: 5px;
  padding: 19px;
  margin-bottom: 20px;
  margin-top: 20px;
  position: relative;

  [type="checkbox"]{
    cursor: auto;
  }

  span{
    color: #666666;
    font-size: 20px;
    line-height: 25px;
  }
`;

const TrashWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
`;

const WeekDays = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 8px;
`;
