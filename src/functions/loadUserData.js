import axios from 'axios';

export default function dataReload(props){
  const {userState, setHabits, setTodaysHabits, setUserHistory, callBackSetHabits} = props;
  const config = {
    headers: {
      Authorization: `Bearer ${userState.token}`,
    },
  };

  //load all habits if valid user is logged in
  const AllHabitsPromise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);
  AllHabitsPromise.then(({ data }) => {
    setHabits(data);
    typeof(callBackSetHabits)==="function" && callBackSetHabits();
  })
  AllHabitsPromise.catch(() => {
    alert("Erro na requisicao de habitos");
  });

  //load todays habits if valid user is logged in
  const TodaysHabitsPromise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);
  TodaysHabitsPromise.then(({ data }) => {
    setTodaysHabits(data);
  })
  TodaysHabitsPromise.catch(() => {
    alert("Erro ao buscar habitos diarios");
  });

  //load user history if valid user is logged in
  const HistoryPromisse = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily", config);
  HistoryPromisse.then(({ data }) => {
    setUserHistory(data);
  })
  HistoryPromisse.catch(() => {
    alert("Erro ao buscar dados do historico");
  });

  return Promise.all([AllHabitsPromise,TodaysHabitsPromise,HistoryPromisse]);
}