import styled from "styled-components";
import { CheckmarkOutline } from "react-ionicons";

export default function HistoryHabitCard(props) {
  const { name, done } = props;

  return (
    <CardWrapper done={done}>
      <section>
        <div className="daily-habit-check-box">
          <CheckmarkOutline />
        </div>
        <h3>{name}</h3>
      </section>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  position: relative;
  background-color: white;
  color: #666666;
  border-radius: 5px;
  padding: 13px;
  cursor: pointer;

  h3 {
    font-size: 20px;
    line-height: 25px;
    margin-bottom: 10px;
  }

  .daily-habit-check-box {
    float: right;
    height: 20px;
    width: 20px;
    background-color: ${(props) =>
      props.done === false ? "#e7e7e7" : "var(--light-green)"};
    border-radius: 5px;

    svg {
      width: 93%;
      height: 93%;
      color: white;
    }
  }
`;
