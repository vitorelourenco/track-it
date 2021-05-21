import SubmitButton from "./SubmitButton";
import CancelButton from "./CancelButton";
import CheckBox from "./CheckBox";
import Input from "./Input";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import ThreeDots from "./ThreeDots";
import TodaysContext from "../contexts/TodaysContext";
import HabitsContext from "../contexts/HabitsContext";
import HistoryContext from "../contexts/HistoryContext";
import loadUserData from '../functions/loadUserData';

export default function NewHabit(props) {
  function cancel(e) {
    e.preventDefault();
    setMakingNewHabit(false);
  }

  function submit(e) {
    e.preventDefault();
    const days = checkBoxRowState
      .map((elem, i) => (elem !== false ? i : false))
      .filter((elem) => elem !== false);
    const name = habitName;

    const body = { name, days };
    const config = {
      headers: {
        Authorization: `Bearer ${userState.token}`,
      },
    };

    setIsInteractive(false);
    //posting new habit
    axios
      .post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", body, config)
      .then(() => {

        const callBackSetHabits = () =>{
          setIsInteractive(true);
          setHabitName("");
          setCheckBoxRowState([...checkBoxRowState].fill(false));
          setMakingNewHabit(false);
        }

        loadUserData({userState, setHabits, setTodaysHabits, setUserHistory, callBackSetHabits});

      })
      .catch(() => {
        alert("Erro ao adicionar um novo habito");
        setIsInteractive(true);
      });
  }

  const {
    weekDays,
    checkBoxRowState,
    setCheckBoxRowState,
    setMakingNewHabit,
    habitName,
    setHabitName,
    className,
  } = props;

  const { setUserHistory } = useContext(HistoryContext);
  const { userState } = useContext(UserContext);
  const [isInteractive, setIsInteractive] = useState(true);

  const dayIsRequired = !checkBoxRowState.reduce(
    (acc, checkBoxUnitState) => (acc = acc || checkBoxUnitState),
    false
  );

  const { setTodaysHabits } = useContext(TodaysContext);
  const { setHabits } = useContext(HabitsContext);

  return (
    <NewHabitWrapper className={className}>
      <form onSubmit={submit}>
        <Input
          type="text"
          placeholder="nome do hábito"
          state={habitName}
          setState={setHabitName}
          required={true}
          disabled={!isInteractive}
          name="habitName"
        />
        <WeekDays>
          {weekDays.map(({ char, id }, i) => (
            <CheckBox
              key={id}
              index={i}
              state={checkBoxRowState}
              setState={setCheckBoxRowState}
              char={char}
              disabled={!isInteractive}
              required={dayIsRequired}
              name="days"
            />
          ))}
        </WeekDays>
        <ButtonBox>
          <CancelButton
            disabled={!isInteractive}
            onClick={cancel}
            text="Cancelar"
          />
          <SubmitButton
            style={{ width: "80px" }}
            disabled={!isInteractive}
            text={
              !isInteractive ? (
                <ThreeDots iconHeight="10px" iconWidth="30px" />
              ) : (
                "Salvar"
              )
            }
          />
        </ButtonBox>
      </form>
    </NewHabitWrapper>
  );
}

const NewHabitWrapper = styled.article`
  background-color: white;
  border-radius: 5px;
  padding: 19px;
  margin-bottom: 20px;
  margin-top: 20px;

  [type="text"] {
    width: 100%;
    color: #666666;
  }

  [type="submit"] {
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
