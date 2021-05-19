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
import {useState} from 'react';
import UserContext from './contexts/UserContext';


function App() {

  const [userState, setUserState] = useState(undefined)

  return (
    <UserContext.Provider value={{userState, setUserState}}>
      <GlobalStylesReset />
      <GlobalStylesVEL />
      <GlobalStylesTrackIt />
      <Switch>
        <Route exact path="/">
          <LogIn />
        </Route>
        <Route exact path="/cadastro">
          <SignUp />
        </Route>
        <Route exact path="/habitos">
          <Habits />
        </Route>
        <Route exact path="/hoje">
          <Today />
        </Route>
        <Route exact path="/historico">
          <History />
        </Route>
      </Switch>
    </UserContext.Provider>
  );
}

export default App;
