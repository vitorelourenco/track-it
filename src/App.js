import './App.css';
import GlobalStylesReset from './global_styles/GlobalStylesReset';
import GlobalStylesVEL from './global_styles/GlobalStylesVEL';
import GlobalStylesTrackIt from './global_styles/GlobalStylesTrackIt';

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
import LoadingCover from './components/LoadingCover';
import axios from 'axios';

function App() {

  const [userState, setUserState] = useState(undefined);
  const [navState, setNavState] = useState(false);
  const [todaysHabits, setTodaysHabits] = useState([]);
  const [habits, setHabits] = useState([]);

  const [loginTriggered, setLoginTriggered] = useState(false);
  const [loginResolved, setLoginResolved] = useState(false);

  const history = useHistory();
  const location = useLocation();
  const pathName = location.pathname;

  useEffect(()=>{
    const localUser = localStorage.getItem("user");
    if (localUser !== null){
      setUserState(JSON.parse(localUser));
      setLoginTriggered(true);
    }
  },[]);

  useEffect(()=>{
    if(loginTriggered && !loginResolved && userState && userState.token){
      const config = {
        headers: {
            Authorization: `Bearer ${userState.token}`,
        },
      };
      const urlHabits = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
      const urlTodaysHabits = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
      const promiseHabits = axios.get(urlHabits, config);
      const promiteTodaysHabits = axios.get(urlTodaysHabits, config);
      Promise.all([promiseHabits,promiteTodaysHabits]).then(arrValues=>{
        setHabits(arrValues[0].data);
        setTodaysHabits(arrValues[1].data);
        setLoginResolved(true);
      })
      .catch(()=>{
        alert("Falha no login");
        setLoginTriggered(false);
      })
    }
  },[loginTriggered,loginResolved])

  useEffect(()=>{
    if (loginResolved){
      if(pathName==="/historico") history.push(pathName);
      if(pathName==="/habitos") history.push(pathName);
      history.push("/hoje");
    }
  },[loginResolved])

  if(loginTriggered && !loginResolved && pathName==="/"){
    return <LoadingCover isInteractive={false} rgba={"rgba(18,107,165,1)"} />
  }

  if(!loginResolved && pathName!=="/" && pathName!=="/cadastro"){
    history.push("/");
  }

  return (
    <UserContext.Provider value={{userState, setUserState}}>
      <TodaysContext.Provider value={{todaysHabits, setTodaysHabits}}>
        <NavContext.Provider value={{navState, setNavState}}>
          <GlobalStylesReset />
          <GlobalStylesVEL />
          <GlobalStylesTrackIt />
          <Switch>
            <Route exact path="/habitos">
              <Habits habits={habits} setHabits={setHabits} />
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
              <LogIn setLoginTriggered={setLoginTriggered} setLoginResolved={setLoginResolved}/>
            </Route>
          </Switch>
        </NavContext.Provider>
      </TodaysContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
