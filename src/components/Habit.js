import CheckBox from "./CheckBox";
import styled from "styled-components";
import { TrashOutline } from "react-ionicons";
import UserContext from "../contexts/UserContext";
import { useContext, useState , useEffect} from "react";
import axios from "axios";
import LoadingCover from './LoadingCover';

export default function Habit(props) {
  const { weekDays, checkBoxRowState, habitName, id, habits } = props;

  const { userState, setUserState } = useContext(UserContext);

  const [isInteractive, setIsInteractive] = useState(true);

  function deleteTask() {
    if (!window.confirm(`Deseja deletar o hábito \n ${habitName}`)) return; 
    setIsInteractive(false);
    const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`;
    const config = {
      headers: {
        Authorization: `Bearer ${userState.token}`,
      },
    };
    axios
      .delete(url, config)
      .then(() => {
        setUserState({...userState})
      })
      .catch(() => {
        setIsInteractive(true);
        console.log('habit.js')
        alert("Deu ruim");
      });
  }

  return (
    <HabbitWrapper>
      <LoadingCover isInteractive={isInteractive} rgba="rgba(255,120,0,0.5)"/>
      <TrashWrapper onClick={deleteTask}>
        <TrashOutline />
      </TrashWrapper>
      <span>{habitName}</span>
      <WeekDays>
        {weekDays.map(({ char, id }, i) => (
          <CheckBox
            key={id}
            index={i}
            state={checkBoxRowState}
            char={char}
            disabled={true}
          />
        ))}
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

  [type="checkbox"] {
    cursor: auto;
  }

  span {
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
