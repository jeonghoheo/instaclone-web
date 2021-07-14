import { useMemo } from "react";
import sanitizeHtml from "sanitize-html";
import styled from "styled-components";
import { FatText } from "../shared";

interface IProps {
  author: string;
  payload: string;
}

const CommentContainer = styled.div``;
const CommentCaption = styled.span`
  margin-left: 10px;
  mark {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

function Comment({ author, payload }: IProps) {
  const cleanedPayload = useMemo(
    () =>
      sanitizeHtml(
        payload.replace(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g, "<mark>$&</mark>"),
        {
          allowedTags: ["mark"]
        }
      ),
    [payload]
  );
  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      <CommentCaption
        dangerouslySetInnerHTML={{
          __html: cleanedPayload
        }}
      ></CommentCaption>
    </CommentContainer>
  );
}

export default Comment;
