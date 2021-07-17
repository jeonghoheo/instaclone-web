import { Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FatText } from "../shared";

interface IProps {
  author: string;
  payload: string;
}

const CommentContainer = styled.div``;
const CommentCaption = styled.span`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

function Comment({ author, payload }: IProps) {
  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      <CommentCaption>
        {payload.split(" ").map((word, index) =>
          /#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/.test(word) ? (
            <Fragment key={index}>
              <Link to={`/hashtags/${word}`}>{word}</Link>{" "}
            </Fragment>
          ) : (
            <Fragment key={index}>{word} </Fragment>
          )
        )}
      </CommentCaption>
    </CommentContainer>
  );
}

export default Comment;
