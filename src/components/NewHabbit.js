import SubmitButton from "./SubmitButton";
import CancelButton from "./CancelButton";
import CheckBox from "./CheckBox";
import Input from "./Input";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import ThreeDots from "./ThreeDots";

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
    const url =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
    const body = { name, days };
    const config = {
      headers: {
        Authorization: `Bearer ${userState.token}`,
      },
    };

    setIsInteractive(false);
    axios
      .post(url, body, config)
      .then(() => {
        setUserState({ ...userState });
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
    makingNewHabit,
    habitName,
    setHabitName,
    className,
  } = props;
  const { userState, setUserState } = useContext(UserContext);
  const [isInteractive, setIsInteractive] = useState(true);
  const dayIsRequired = !checkBoxRowState.reduce(
    (acc, bol) => (acc = acc || bol),
    false
  );

  useEffect(() => {
    if (!makingNewHabit && !isInteractive) {
      setIsInteractive(true);
      setHabitName("");
      setCheckBoxRowState([...checkBoxRowState].fill(false));
      setMakingNewHabit(false);
    }
  }, [makingNewHabit]);

  return (
    <NewHabbitWrapper className={className}>
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
    </NewHabbitWrapper>
  );
}

const NewHabbitWrapper = styled.article`
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
