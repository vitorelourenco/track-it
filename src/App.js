import "./App.css";
import GlobalStylesReset from "./global_styles/GlobalStylesReset";
import GlobalStylesVEL from "./global_styles/GlobalStylesVEL";
import GlobalStylesTrackIt from "./global_styles/GlobalStylesTrackIt";

import Habits from "./components/Habits";
import Today from "./components/Today";
import History from "./components/History";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import { Route } from "react-router";
import { Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import UserContext from "./contexts/UserContext";
import NavContext from "./contexts/NavContext";
import { useHistory, useLocation } from "react-router-dom";
import TodaysContext from "./contexts/TodaysContext";
import HabitsContext from "./contexts/HabitsContext";
import HistoryContext from "./contexts/HistoryContext";
import loadUserData from "./functions/loadUserData";
import LoadingCover from "./components/LoadingCover";

function App() {
  const [userState, setUserState] = useState(undefined);
  const [navState, setNavState] = useState(false);
  const [todaysHabits, setTodaysHabits] = useState([]);
  const [habits, setHabits] = useState([]);
  const [userHistory, setUserHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();
  const location = useLocation();
  const pathName = location.pathname;
  const localUser = localStorage.getItem("user");

  //load user from local storage
  useEffect(() => {
    if (localUser !== null) {
      const parsedUser = JSON.parse(localUser);
      setUserState(parsedUser);

      loadUserData({
        userState: parsedUser,
        setHabits,
        setTodaysHabits,
        setUserHistory,
      }).then(() => {
        history.push("/hoje");
        setIsLoading(false);
      });
    }

  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const noLogPath = pathName === "/cadastro" || pathName === "/";
  const condition = !noLogPath || (noLogPath && localUser !== null);
  const showLoadingScreen = isLoading && condition;

  return (
    <UserContext.Provider value={{ userState, setUserState }}>
      <TodaysContext.Provider value={{ todaysHabits, setTodaysHabits }}>
        <HabitsContext.Provider value={{ habits, setHabits }}>
          <HistoryContext.Provider value={{ userHistory, setUserHistory }}>
            <NavContext.Provider value={{ navState, setNavState }}>
              <GlobalStylesReset />
              <GlobalStylesVEL />
              <GlobalStylesTrackIt />
              {showLoadingScreen ? (
                <LoadingCover inInteractive={false} rgba={"rgba(18,107,165,1)"} />
              ) : (
                ""
              )}
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
                  <LogIn setIsLoading={setIsLoading} />
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
