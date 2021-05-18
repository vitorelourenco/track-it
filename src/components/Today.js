import Header from './Header';
import Menu from './Menu';
import styled from 'styled-components';
import DailyHabitCard from './DailyHabitCard';

export default function History(){
  return (
    <>
      <Header />
      <MainWrapper>
        <DailyHabitCard
          name={"banana"}
          sequence={3}
          record={3}
          setState={()=>null}
        >
        </DailyHabitCard>

      </MainWrapper>
      <Menu /> 
    </>
  )
}

const MainWrapper = styled.main`
  background-color: var(--light-grey);
  padding: 80px 18px 115px 18px;
  min-height: 100vh;

  h2 {
    color: var(--dark-blue);
    font-size: 23px;
    line-height: 29px;
  }
`;
