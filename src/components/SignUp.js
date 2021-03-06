import styled from "styled-components";
import Input from "./Input";
import Logo from "./Logo";
import SubmitButton from "./SubmitButton";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import ThreeDots from "./ThreeDots";

export default function SingUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isInteractive, setIsInteractive] = useState(true);
  const history = useHistory();

  function submit(e) {
    e.preventDefault();
    setIsInteractive(false);
    const url =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up";
    const body = { email, name, image, password };
    axios
      .post(url, body)
      .then(() => {
        setIsInteractive(true);
        history.push({
          pathname: "/",
        });
      })
      .catch(() => {
        alert("Erro ao tentar cadastrar");
        setIsInteractive(true);
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
        <Input
          type="text"
          placeholder="nome"
          state={name}
          setState={setName}
          required={true}
          disabled={isInteractive ? false : true}
        />
        <Input
          type="url"
          placeholder="foto"
          state={image}
          setState={setImage}
          required={true}
          disabled={isInteractive ? false : true}
        />
        <SubmitButton
          text={
            isInteractive ? (
              "Cadastrar"
            ) : (
              <ThreeDots iconHeight="10px" iconWidth="100px" />
            )
          }
          disabled={isInteractive ? false : true}
        />
      </form>
      <Link to="/">J?? tem uma conta? Fa??a login!</Link>
    </MainWrapper>
  );
}

const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 68px 36px 36px 36px;
  background-color: white;
  margin: 0;
  height: 100vh;

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
