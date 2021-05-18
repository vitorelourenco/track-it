import styled from 'styled-components';
import Input from './Input';
import Logo from './Logo';
import SubmitButton from './SubmitButton';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";


export default function LogIn(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const interactionDisabled = true;

  const ThreeDots = () => (
      <Loader
        type="ThreeDots"
        color="#ffffff"
        height={10}
        width={100}
        timeout={0} //3 secs
      />
  );

  return(
    <MainWrapper> 
      <Logo logoWidth="160"/>
      <span>TrackIt</span>
      <form onSubmit={(e)=>e.preventDefault()}>
        <Input
          type="email"
          placeholder="email"
          state={email}
          setState={setEmail}
          required={true}
          disabled={interactionDisabled?true:false}
        />
        <Input 
          type="password"
          placeholder="senha"
          state={password}
          setState={setPassword}
          required={true}
          disabled={interactionDisabled?true:false}
        />
        <SubmitButton
          text={interactionDisabled?<ThreeDots />:"Entrar"}
          onClick={()=>""}
          disabled={interactionDisabled?true:false}
        />
      </form>
      <Link to="/cadastro">
        Não tem uma conta? Cadastre-se!
      </Link>
    </MainWrapper>
  );
}

const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 135px 36px 36px 36px;
  background-color: white;

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
