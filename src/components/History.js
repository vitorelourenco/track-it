import Header from "./Header";
import Menu from "./Menu";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from 'axios';
import { useHistory } from "react-router";
var dayjs = require("dayjs");

export default function History() {
  const { userState } = useContext(UserContext);

  const [userHistory, setUserHistory] = useState([]);

  useEffect(() => {
    if (typeof userState !== "object" || !userState.hasOwnProperty("token"))
      return;

    const url =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily";
    const config = {
      headers: {
        Authorization: `Bearer ${userState.token}`,
      },
    };
    axios
      .get(url, config)
      .then(({ data }) => {
        setUserHistory(data);
      })
      .catch(() => {
        alert("Erro ao buscar dados do historico");
      });
  }, [userState]);

  const historyAnalisys = userHistory.reduce((acc,{day, habits})=>{
    const doneCount = habits.reduce((acc,elem)=>elem.done?acc+1:acc,0);
    const verdict = doneCount === habits.length? "perfect" : "lacking"; 
    acc[day]=verdict;
    return (acc);
  },{});

  if (localStorage.getItem("user") === null) {
    window.location.href = "/";
    return "";
  }
  return (
    <>
      <Header />
      <MainWrapper>
        <h2>Histórico</h2>
        <Calendar
          locale="pt-BR"
          formatDay={(locale, date) => formatDate(date, historyAnalisys)}
        />
      </MainWrapper>
      <Menu />
    </>
  );
}

function formatDate(date, historyAnalisys) {
  const dayjsDate = dayjs(date);
  const formatedDate = dayjsDate.format("DD/MM/YYYY");
  const className = 
    historyAnalisys.hasOwnProperty(formatedDate) 
    ? historyAnalisys[formatedDate]
    : "";
  return (
    <CalendarDay className={className}>{dayjsDate.date()}</CalendarDay>
  );
}

const CalendarDay = styled.div`
  height: 35px;
  width: 35px;
  display: flex;
  justify-content: center;
  align-items: center;

  &.perfect {
    background-color: var(--light-green);
    border-radius: 50%;
  }

  &.lacking {
    background-color: #ea5766;
    border-radius: 50%;
  }
`;

const MainWrapper = styled.main`
  background-color: var(--light-grey);
  padding: 23px 18px 53px 18px;

  .react-calendar {
    border-radius: 5px;
    border: none;
  }

  h2 {
    color: var(--dark-blue);
    font-size: 23px;
    line-height: 29px;
  }

  p {
    margin-top: 30px;
    color: #666666;
    font-size: 18px;
    line-height: 22px;
  }
`;
