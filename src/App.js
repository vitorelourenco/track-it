import './App.css';
import GlobalStylesReset from './global_styles/GlobalStylesReset';
import GlobalStylesVEL from './global_styles/GlobalStylesVEL';
import GlobalStylesTrackIt from './global_styles/GlobalStylesTrackIt';
import axios from 'axios';

import Habits from './components/Habits';
import Today from './components/Today';
import History from './components/History';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import { Route } from 'react-router';
import {Switch} from 'react-router-dom';
import {useState, useEffect} from 'react';
import UserContext from './contexts/UserContext';
import NavContext from './contexts/NavContext';
import {useHistory, useLocation} from 'react-router-dom';
import TodaysContext from './contexts/TodaysContext';
import HabitsContext from './contexts/HabitsContext';
import HistoryContext from './contexts/HistoryContext';

function App() {

  const [userState, setUserState] = useState(undefined);
  const [navState, setNavState] = useState(false);
  const [todaysHabits, setTodaysHabits] = useState([]);
  const [habits, setHabits] = useState([]);
  const [userHistory, setUserHistory] = useState([]);

  const history = useHistory();
  const location = useLocation();

  //load user from local storage
  useEffect(()=>{
    const localUser = localStorage.getItem("user");
    const pathName = location.pathname;
    if (localUser !== null){
      setUserState(JSON.parse(localUser));
      if (pathName!=="/hoje" && pathName!=="/historico" && pathName!=="/habitos"){
        history.push("/hoje");
      }
    }
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  //loading data ahead of time for a better user experience
  useEffect(() => {
    if (typeof userState !== "object" || !userState.hasOwnProperty("token"))
      return;

    const config = {
      headers: {
        Authorization: `Bearer ${userState.token}`,
      },
    };

    //load all habits if valid user is logged in
    axios
      .get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
      .then(({ data }) => {
        setHabits(data);
      })
      .catch(() => {
        alert("Erro na requisicao de habitos");
      });

    //load todays habits if valid user is logged in
    axios
      .get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)
      .then(({ data }) => {
        setTodaysHabits(data);
      })
      .catch(() => {
        alert("Erro ao buscar habitos diarios");
      });

    //load user history if valid user is logged in
    axios
      .get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily", config)
      .then(({ data }) => {
        setUserHistory(data);
      })
      .catch(() => {
        alert("Erro ao buscar dados do historico");
      });
  }, [userState]);

  return (
    <UserContext.Provider value={{userState, setUserState}}>
      <TodaysContext.Provider value={{todaysHabits, setTodaysHabits}}>
        <HabitsContext.Provider value={{habits, setHabits}}>
          <HistoryContext.Provider value={{userHistory, setUserHistory}}>
            <NavContext.Provider value={{navState, setNavState}}>
              <GlobalStylesReset />
              <GlobalStylesVEL />
              <GlobalStylesTrackIt />
              <Switch>
                <Route exact path="/habitos">
                  <Habits />
                </Route>
                <Route exact path="/hoje">
                  <Today />
                </Route>
                <Route exact path="/historico">
                  <History />
                </Route>
                <Route exact path="/cadastro">
                  <SignUp />
                </Route>
                <Route path="/">
                  <LogIn />
                </Route>
              </Switch>
            </NavContext.Provider>
          </HistoryContext.Provider>
        </HabitsContext.Provider>
      </TodaysContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
