import { gql, MutationUpdaterFn, useMutation } from "@apollo/client";
import { useCallback } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  deleteComment,
  deleteCommentVariables
} from "../../__generated__/deleteComment";
import { FatText } from "../shared";

interface IProps {
  author: string;
  payload: string;
  photoId: number;
  isMine?: boolean | null;
  id?: number;
}

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
      error
    }
  }
`;

const CommentContainer = styled.div`
  margin-bottom: 7px;
`;
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

function Comment({ author, payload, photoId, id, isMine }: IProps) {
  const updateDeleteComment = useCallback<MutationUpdaterFn<deleteComment>>(
    (cache, result) => {
      const {
        deleteComment: { ok }
      } = result.data as deleteComment;
      if (ok) {
        cache.evict({ id: `Comment:${id}` });
        cache.modify({
          id: `Photo:${photoId}`,
          fields: {
            commentNumber(prev) {
              return prev - 1;
            }
          }
        });
      }
    },
    [id, photoId]
  );
  const [deleteCommentMutation] = useMutation<
    deleteComment,
    deleteCommentVariables
  >(DELETE_COMMENT_MUTATION, {
    variables: {
      id: id as number
    },
    update: updateDeleteComment
  });
  const onDeleteClick = () => {
    deleteCommentMutation();
  };
  return (
    <CommentContainer>
      <Link to={`/users/${author}`}>
        <FatText>{author}</FatText>
      </Link>
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
      {isMine ? <button onClick={onDeleteClick}>❌</button> : null}
    </CommentContainer>
  );
}

export default Comment;
