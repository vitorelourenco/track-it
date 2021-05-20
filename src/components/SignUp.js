import styled from 'styled-components';
import Input from './Input';
import Logo from './Logo';
import SubmitButton from './SubmitButton';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import ThreeDots from './ThreeDots';

export default function SingUp(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isInteractive, setIsInteractive] = useState(true);

  const history = useHistory();

  function submit(e){
    e.preventDefault();
    setIsInteractive(false);
    const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up"
    const body = {email,name,image,password}
    axios
    .post(url,body)
    .then(({data})=>{
      setIsInteractive(true);
      console.log(data);
      history.push({
        pathname:"/",
      });
    })
    .catch((err)=>{
      alert('Deu ruim');
      console.log('signup.js')
      setIsInteractive(true);
      console.log(err);
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
        <Input 
          type="text"
          placeholder="nome"
          state={name}
          setState={setName}
          required={true}
          disabled={isInteractive?false:true}
        />
        <Input 
          type="url"
          placeholder="foto"
          state={image}
          setState={setImage}
          required={true}
          disabled={isInteractive?false:true}
        />
        <SubmitButton 
          text={isInteractive?"Cadastrar":<ThreeDots iconHeight="10px" iconWidth="100px"/>}
          disabled={isInteractive?false:true}
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
