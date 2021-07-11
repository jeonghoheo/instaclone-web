import styled from "styled-components";
import { FatText } from "../shared";

interface IProps {
  author: string;
  payload: string;
}

const CommentContainer = styled.div``;
const CommentCaption = styled.span`
  margin-left: 10px;
`;

function Comment({ author, payload }: IProps) {
  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      <CommentCaption>{payload}</CommentCaption>
    </CommentContainer>
  );
}

export default Comment;
