import styled from "styled-components";

interface IProps {
  url?: string;
  lg?: boolean;
}

const SAvatar = styled.div<{ lg: boolean }>`
  width: ${(props) => (props.lg ? "35px" : "25px")};
  height: ${(props) => (props.lg ? "35px" : "25px")};
  border-radius: 15px;
  background-color: #2c2c2c;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
`;

function Avatar({ url = "", lg = false }: IProps) {
  return <SAvatar lg={lg}>{url !== "" ? <Img src={url} /> : null}</SAvatar>;
}
export default Avatar;
