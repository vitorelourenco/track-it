import Header from "./Header";
import Menu from "./Menu";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import { useContext, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
var dayjs = require("dayjs");

export default function History() {
  const { userState } = useContext(UserContext);

  const [date, setDate] = useState(dayjs());

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
          formatDay={(locale, date) => formatDate(date, "d")}
        />
      </MainWrapper>
      <Menu />
    </>
  );
}

function formatDate(date, type) {
  const dayjsDate = dayjs(date);
  const day = dayjsDate.date();

  //perfect or missing
  const habitStatus = "perfect";
  return (
    <CalendarDay className={day === 21 ? habitStatus : ""}>{day}</CalendarDay>
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

  &.missing {
    background-color: #ea5766;
    border-radius: 50%;
  }
`;

const MainWrapper = styled.main`
  background-color: var(--light-grey);
  padding: 80px 18px 115px 18px;
  min-height: 100vh;

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
