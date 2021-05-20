import styled from "styled-components";

export default function Input(props) {
  const { type, placeholder, state, setState } = props;
  const { className, onClick, required, disabled } = props;

  return (
    <InputWrapper
      className={className}
      onClick={typeof onClick === "function" ? onClick : () => undefined}
      type={type}
      placeholder={placeholder}
      value={state}
      required={!!required}
      onChange={(e) => setState(e.target.value)}
      disabled={!!disabled}
    />
  );
}

const InputWrapper = styled.input`
  height: 45px;
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  font-size: 20px;
  padding-left: 10px;
  padding-right: 10px;

  &:disabled {
    background-color: #f2f2f2;
  }

  &::placeholder {
    color: #dbdbdb;
  }
`;
