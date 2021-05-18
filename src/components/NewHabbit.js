import SubmitButton from './SubmitButton';
import CancelButton from './CancelButton';
import CheckBox from './CheckBox';
import Input from './Input';
import styled from 'styled-components';

export default function NewHabit(props){
  const {weekDays} = props;
  const {checkBoxRowState, setCheckBoxRowState} = props;
  const {habitName, setHabitName} = props;

  const dayIsRequired = !checkBoxRowState.reduce((acc,bol)=>acc=acc||bol,false);

  return (
    <NewHabbitWrapper>
      <form action={()=>false} onSubmit={(e)=>e.preventDefault()}>
        <Input 
          type="text"
          placeholder="nome do hábito"
          state={habitName}
          setState={setHabitName}
          required={true}
          disabled={false}
          name="habitName"
        />
        <WeekDays>
          {weekDays.map(({char, id}, i)=>
            <CheckBox 
              key={id}
              index={i}
              state={checkBoxRowState}
              setState={setCheckBoxRowState}
              char={char}
              disabled={false}
              required={dayIsRequired}
              name="days"
            />
          )}
        </WeekDays>
        <ButtonBox>
          <CancelButton text="Cancelar"/>
          <SubmitButton text="Salvar"/>
        </ButtonBox>
      </form>
    </NewHabbitWrapper>
  );
}


const NewHabbitWrapper = styled.article`
  background-color: white;
  border-radius: 5px;
  padding: 19px;
  margin-bottom: 20px;
  margin-top: 20px;

  [type="text"]{
    width: 100%;
    color: #666666;
  }

  [type="submit"]{
    font-size: 16px;
    line-height: 20px;
    padding: 7px 17px;
  }
`;

const WeekDays = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 8px;
`;

const ButtonBox = styled.div`
  height: 70px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 10px;
`;
