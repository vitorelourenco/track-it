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


function App() {

  const [userState, setUserState] = useState(undefined)

  //delete this later
  useEffect(()=>
    setUserState(
      {
        email: "vitor@ra.com",
        id: 70,
        image: "https://img.ibxk.com.br/2019/07/26/26000559344397.jpg",
        name: "vitor",
        password: "12345",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzAsImlhdCI6MTYyMTQzNDA5NH0.FYV96StPfMYmLPtR51GUt0BY0SqjzcdpzDLsJumckXM"
      }
    )
  ,[]);

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
