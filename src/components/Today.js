import Header from "./Header";
import Menu from "./Menu";
import styled from "styled-components";
import TodaysHabitsCard from "./TodaysHabitsCard";
import UserContext from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import percentage from "../functions/percentage";
import LoadingCover from "./LoadingCover";
var dayjs = require("dayjs");

export default function Today() {
  function getWeekDay(num) {
    switch (num) {
      case 0:
        return "Domingo";
      case 1:
        return "Segunda";
      case 2:
        return "Terça";
      case 3:
        return "Quarta";
      case 4:
        return "Quinta";
      case 5:
        return "Sexta";
      case 6:
        return "Sábado";
      default:
        return "";
    }
  }

  const { userState } = useContext(UserContext);
  const [todaysHabits, setTodaysHabits] = useState([]);
  const [loading, setLoading] = useState(false);
  const now = dayjs();
  const weekday = getWeekDay(now.day());
  const monthday = now.date();
  const month = now.month() + 1;

  useEffect(() => {
    setLoading(true);
    if (typeof userState !== "object" || !userState.hasOwnProperty("token"))
      return;

    const url =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
    const config = {
      headers: {
        Authorization: `Bearer ${userState.token}`,
      },
    };
    axios
      .get(url, config)
      .then(({ data }) => {
        setTodaysHabits(data);
        setLoading(false);
      })
      .catch(() => {
        console.log("today.js");
        alert("Deu ruim");
        setLoading(false);
      });
  }, [userState]);

  if (localStorage.getItem("user") === null) {
    window.location.href = "/";
    return "";
  }

  return (
    <>
      <Header />
      <MainWrapper>
        <h2>
          {weekday}, {monthday}/{month}
        </h2>
        {(() => {
          if (todaysHabits.length === 0 && loading) {
            return (
              <LoadingCover
                isInteractive={false}
                rgba={"rgba(62, 152, 199, 0.5)"}
              />
            );
          }
          return (
            <>
              <p>
                {(() => {
                  const percent = percentage(todaysHabits, "done");
                  if (percent === 0) return "Nenhum hábito concluído ainda";
                  return <em>{percent}% dos hábitos concluídos</em>;
                })()}
              </p>
              {todaysHabits.map(
                ({ id, name, done, currentSequence, highestSequence }) => (
                  <TodaysHabitsCard
                    key={id}
                    habitId={id}
                    name={name}
                    done={done}
                    currentSequence={currentSequence}
                    highestSequence={highestSequence}
                  />
                )
              )}
            </>
          );
        })()}
      </MainWrapper>
      <Menu />
    </>
  );
}

const MainWrapper = styled.main`
  background-color: var(--light-grey);
  padding: 80px 18px 115px 18px;
  min-height: 100vh;
  z-index: 1;
  position: relative;

  & > h2 {
    color: var(--dark-blue);
    font-size: 23px;
    line-height: 29px;
  }

  & > p {
    color: #bababa;
    font-size: 18px;
    line-height: 22px;
    margin-bottom: 28px;
  }

  & > p em {
    color: var(--light-green);
  }

  & > div {
    margin-top: 10px;
  }
`;
