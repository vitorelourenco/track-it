import styled from 'styled-components';
import Input from './Input';
import Logo from './Logo';
import SubmitButton from './SubmitButton';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import ThreeDots from './ThreeDots';
import axios from 'axios';
import {useHistory} from 'react-router-dom';


export default function LogIn(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isInteractive, setIsInteractive] = useState(true);

  const history = useHistory();

  function submit(e){
    e.preventDefault();
    setIsInteractive(false);
    const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";
    const body = {email, password}
    axios
      .post(url,body)
      .then(({data})=>{
        setIsInteractive(true);
        history.push({
          pathname:"/hoje"
        })
        console.log(data);
      })
      .catch((err)=>{
        setIsInteractive(true);
        console.log(err);
        alert('Deu ruim');
      })
  }

  return(
    <MainWrapper> 
      <Logo logoWidth="160"/>
      <span>TrackIt</span>
      <form onSubmit={submit}>
        <Input
          type="email"
          placeholder="email"
          state={email}
          setState={setEmail}
          required={true}
          disabled={isInteractive?false:true}
        />
        <Input 
          type="password"
          placeholder="senha"
          state={password}
          setState={setPassword}
          required={true}
          disabled={isInteractive?false:true}
        />
        <SubmitButton
          text={isInteractive?"Entrar":<ThreeDots />}
          disabled={isInteractive?false:true}
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
