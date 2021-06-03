import styled from "styled-components";

interface IProps {
  hasError?: boolean;
}

const Input = styled.input<IProps>`
  width: 100%;
  border-radius: 3px;
  padding: 7px;
  background-color: #fafafa;
  border: 0.5px solid
    ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
  margin-top: 5px;
  box-sizing: border-box;
  color: rgb(38, 38, 38);
  &::placeholder {
    font-size: 12px;
  }
  &:focus {
    border-color: ${(props) => (props.hasError ? "tomato" : "rgb(38, 38, 38)")};
  }
`;

export default Input;
