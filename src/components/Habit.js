import CheckBox from "./CheckBox";
import styled from "styled-components";
import { TrashOutline } from "react-ionicons";
import UserContext from "../contexts/UserContext";
import { useContext, useState } from "react";
import axios from "axios";
import LoadingCover from "./LoadingCover";
import TodaysContext from '../contexts/TodaysContext';
import HabitsContext from '../contexts/HabitsContext';

export default function Habit(props) {
  const { weekDays, checkBoxRowState, habitName, id } = props;
  const { userState, setUserState } = useContext(UserContext);
  const [isInteractive, setIsInteractive] = useState(true);

  const {todaysHabits, setTodaysHabits} = useContext(TodaysContext);
  const {habits, setHabits} = useContext(HabitsContext);


  function deleteTask() {
    if (!window.confirm(`Deseja deletar o hábito \n ${habitName}`)) return;
    setIsInteractive(false);
    const config = {
      headers: {
        Authorization: `Bearer ${userState.token}`,
      },
    };
    
    axios
    .delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, config)
    .then(() => {

      axios
      .get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)
      .then(({ data }) => {
        setTodaysHabits(data);
      })
      .catch(() => {
        alert("Erro ao buscar habitos diarios");
      });

      axios
      .get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
      .then(({ data }) => {
        setHabits(data);
      })
      .catch(() => {
        alert("Erro na requisicao de habitos");
      });

    })
    .catch(() => {
      setIsInteractive(true);
      alert("Erro ao tentar deletar habito");
    });
  }

  return (
    <HabbitWrapper>
      <LoadingCover isInteractive={isInteractive} rgba="rgba(255,120,0,0.5)" />
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
