import Header from "./Header";
import Menu from "./Menu";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from 'axios';
import HistoryHabitCard from './HistoryHabitsCard';
import HistoryContext from '../contexts/HistoryContext';
import HabitsContext from '../contexts/HabitsContext';
import TodaysContext from '../contexts/TodaysContext';
var dayjs = require("dayjs");

export default function History() {
  const { userState } = useContext(UserContext);

  const { dailyHabits } = useContext(TodaysContext);
  const { habits } = useContext(HabitsContext);
  const { userHistory, setUserHistory } = useContext(HistoryContext);
  const [onShow, setOnShow] = useState(undefined)

  const historyAnalisys = userHistory.reduce((acc,{day, habits})=>{
    const doneCount = habits.reduce((acc,elem)=>elem.done?acc+1:acc,0);
    const verdict = doneCount === habits.length? "perfect" : "lacking"; 
    acc[day]={verdict, habits};
    return (acc);
  },{});

  //load user history if valid user is logged in
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
  }, []);

  if (localStorage.getItem("user") === null) {
    window.location.href = "/";
    return "";
  }

  function onClickDay(date){
    const dayjsDate = dayjs(date);
    const formatedDate = dayjsDate.format("DD/MM/YYYY");
    if (!historyAnalisys.hasOwnProperty(formatedDate)){
      setOnShow(undefined);
      return;
    } 
    onShow === formatedDate ? setOnShow(undefined) : setOnShow(formatedDate);
  }

  return (
    <>
      <Header />
      <MainWrapper>
        <h2>Histórico</h2>
        <CalendarWrapper>
          <Calendar onClickDay={onClickDay}
            locale="pt-BR"
            formatDay={(locale, date) => formatDate(date, historyAnalisys)}
          />
          <FlexContainer>
            {onShow ? historyAnalisys[onShow].habits.map(({id, name, done})=>{
              return <HistoryHabitCard key={id} name={name} done={done}/>
              })
            : ""}
          </FlexContainer>
        </CalendarWrapper>
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
    ? historyAnalisys[formatedDate].verdict
    : "";
  return (
    <CalendarDay className={className}>
      <div className="day">
        {dayjsDate.date()}
      </div>
    </CalendarDay>
  );
}

const FlexContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  & > *:first-child{
    margin-top: 20px;
  }
  & > *:last-child{
    margin-bottom: 20px;
  }
`;

const CalendarWrapper = styled.div`
  margin-top: 20px;
`;

const CalendarDay = styled.div`
  width: 100%;
  padding-bottom: 100%;
  position: relative;

  .day {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

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
