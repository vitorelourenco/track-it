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
import {useHistory} from 'react-router-dom';


function App() {

  const [userState, setUserState] = useState(undefined);
  const [navState, setNavState] = useState(false);

  const history = useHistory();

  useEffect(()=>{
    const localUser = localStorage.getItem("user");
    if (localUser !== null){
      setUserState(JSON.parse(localUser));
      history.push("/hoje");
    }
  },[]);

  return (
    <UserContext.Provider value={{userState, setUserState}}>
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
    </UserContext.Provider>
  );
}

export default App;
