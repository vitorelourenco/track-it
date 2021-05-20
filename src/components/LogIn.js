import styled from "styled-components";
import Input from "./Input";
import Logo from "./Logo";
import SubmitButton from "./SubmitButton";
import ThreeDots from "./ThreeDots";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";

export default function LogIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInteractive, setIsInteractive] = useState(true);

  const history = useHistory();

  const { setUserState } = useContext(UserContext);
  const {setLoginResolved, setLoginTriggered} = props;

  function submit(e) {
    e.preventDefault();
    setIsInteractive(false);
    setLoginTriggered(true);
    const url =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";
    const body = { email, password };
    axios
      .post(url, body)
      .then(({ data }) => {
        localStorage.setItem("user", JSON.stringify(data));
        setIsInteractive(true);
        setUserState({ ...data });
        setLoginResolved(true);
      })
      .catch(() => {
        setLoginTriggered(false);
        setIsInteractive(true);
        alert("Requisicao de login recusada");
      });
  }

  return (
    <MainWrapper>
      <Logo logoWidth="160" />
      <span>TrackIt</span>
      <form onSubmit={submit}>
        <Input
          type="email"
          placeholder="email"
          state={email}
          setState={setEmail}
          required={true}
          disabled={isInteractive ? false : true}
        />
        <Input
          type="password"
          placeholder="senha"
          state={password}
          setState={setPassword}
          required={true}
          disabled={isInteractive ? false : true}
        />
        <SubmitButton
          text={
            isInteractive ? (
              "Entrar"
            ) : (
              <ThreeDots iconHeight="10px" iconWidth="100px" />
            )
          }
          disabled={isInteractive ? false : true}
        />
      </form>
      <Link to="/cadastro">Não tem uma conta? Cadastre-se!</Link>
    </MainWrapper>
  );
}

const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 135px 36px 36px 36px;
  background-color: white;
  margin: 0;
  height: 100vh;

  form {
    width: 100%;
  }

  input,
  button {
    width: 100%;
  }

  input + input,
  input + button {
    margin-top: 6px;
  }

  span {
    font-size: 69px;
    font-family: var(--logo-font);
    color: var(--dark-blue);
    margin-left: -10px;
    margin-bottom: 36px;
  }

  a {
    text-decoration: underline;
    color: var(--light-blue);
    margin-top: 25px;
  }
`;
