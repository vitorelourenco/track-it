import styled from "styled-components";

export default function CancelButton(props) {
  const { className, onClick, disabled, text } = props;

  return (
    <ButtonWrapper
      type="reset"
      disabled={disabled}
      className={className}
      onClick={typeof onClick === "function" ? onClick : () => undefined}
    >
      {text}
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button`
  height: 45px;
  border-radius: 5px;
  border: none;
  font-size: 20px;
  padding-left: 10px;
  padding-right: 10px;
  color: var(--light-blue);
  background-color: white;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
`;
