import styled from "styled-components";

interface IProps {
  message?: string;
}

const SFormError = styled.span`
  color: tomato;
  font-weight: bold;
  font-size: 12px;
  margin: 5px 0px 10px 0px;
`;

function FormError({ message }: IProps) {
  return message ? <SFormError>{message}</SFormError> : null;
}

export default FormError;
