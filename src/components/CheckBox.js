import styled from 'styled-components';

const CheckBox = styled.input.attrs(props=>({
  type:"checkbox",
  name:props.name,
  required: !!props.required,
  checked: props.state[props.index],
  disabled: props.disabled,
  onChange: (() => {
    props.state[props.index] = !props.state[props.index];
    props.setState([...props.state]);
  })
}))`
  -webkit-appearance: none;
  margin: 0;
  width: 30px;
  height: 30px;
  color: #dbdbdb;
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  position: relative;
  font-size: 20px;
  line-height: 25px;
  cursor: pointer;

  &::before{
    content: ${props=>`"${props.char}"`};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:checked{
    color: white;
    background-color: #cfcfcf;
    border: none;
  }
`;

export default CheckBox;
