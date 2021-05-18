import styled from 'styled-components';
import Input from './Input';
import Logo from './Logo';
import SubmitButton from './SubmitButton';
import {useState} from 'react';
import {Link} from 'react-router-dom';

export default function SingUp(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [url, setURL] = useState("");

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
        />
        <Input 
          type="password"
          placeholder="senha"
          state={password}
          setState={setPassword}
        />
        <Input 
          type="text"
          placeholder="nome"
          state={name}
          setState={setName}
        />
        <Input 
          type="url"
          placeholder="foto"
          state={url}
          setState={setURL}
        />
        <SubmitButton 
          text="Cadastrar"
          onClick={()=>""}
        />
      </form>
      <Link to="/">
        Já tem uma conta? Faça login!
      </Link>
    </MainWrapper>

  );
}

const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 68px 36px 36px 36px;
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
