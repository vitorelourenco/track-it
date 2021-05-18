import styled from 'styled-components';

export default function Submit(props){
  const {text} = props;
  const {className, onClick, disabled} = props;

  return (
    <ButtonWrapper 
      disabled={disabled}
      className={className}
      onClick={typeof(onClick) === "function" ? onClick : (()=>undefined)}
      type="submit"
    >
      {text}
    </ButtonWrapper>
  )
}

const ButtonWrapper = styled.button`
  height: 45px;
  border-radius: 5px;
  border: none;
  font-size: 20px;
  padding-left: 10px;
  padding-right: 10px;
  color: white;
  background-color: var(--light-blue);
  cursor: pointer;
  opacity: ${(props)=>props.disabled?0.7:1}
`;