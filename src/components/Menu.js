import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import percentage from "../functions/percentage";
import TodaysContext from "../contexts/TodaysContext";

export default function Menu() {
  const { todaysHabits } = useContext(TodaysContext);
  const history = useHistory();

  return (
    <MenuWrapper>
      <MenuText
        onClick={() => history.push("/habitos")}
        className="cursor-pointer text-align-right"
      >
        Hábitos
      </MenuText>
      <MenuText
        onClick={() => history.push("/historico")}
        className="cursor-pointer text-align-left"
      >
        Histórico
      </MenuText>
      <ProgressBarContainer onClick={() => history.push("/hoje")}>
        <CircularProgressbar
          value={percentage(todaysHabits, "done")}
          text={"Hoje"}
          background
          backgroundPadding={6}
          styles={buildStyles({
            textColor: "white",
            pathColor: "white",
            trailColor: "var(--light-blue)",
            backgroundColor: "var(--light-blue)",
          })}
        />
      </ProgressBarContainer>
    </MenuWrapper>
  );
}

const MenuWrapper = styled.footer`
  color: var(--light-blue);
  background-color: white;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  padding: 22px 0;
  z-index: 100;
  @media (min-width: 320px) {
    padding: 22px 10px;
  }
  @media (min-width: 400px) {
    padding: 22px 36px;
  }
`;

const ProgressBarContainer = styled.div`
  width: 91px;
  height: 91px;
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);
  cursor: pointer;
`;

const MenuText = styled.span`
  display: block;
  width: 8ch;
`;
