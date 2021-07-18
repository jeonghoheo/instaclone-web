import { gql, useMutation } from "@apollo/client";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { seeFeed_seeFeed_photos_comments } from "../../__generated__/seeFeed";
import Comment from "./comment";

interface IProps {
  author: string;
  payload?: string | null;
  commentNumber: number;
  comments: seeFeed_seeFeed_photos_comments[] | null;
  photoId: number;
}

interface IFieldValues {
  payload: string;
}

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      error
    }
  }
`;

const CommentsContainer = styled.div`
  margin-top: 20px;
`;

const CommentCount = styled.span`
  opacity: 0.7;
  margin: 10px 0px;
  display: block;
  font-weight: 600;
  font-size: 10px;
`;

function Comments({
  author,
  payload,
  commentNumber,
  comments,
  photoId
}: IProps) {
  const { register, handleSubmit, setValue } = useForm<IFieldValues>();
  const [createCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION
  );
  const onValid = useCallback(
    (data: IFieldValues) => {
      const { payload } = data;
      if (loading) {
        return;
      }
      createCommentMutation({
        variables: {
          photoId,
          payload
        }
      });
      setValue("payload", "");
    },
    [photoId, createCommentMutation, setValue, loading]
  );
  return (
    <CommentsContainer>
      {author && payload && <Comment author={author} payload={payload} />}
      <CommentCount>
        {commentNumber === 1 ? "1 comment" : `${commentNumber} comments`}
      </CommentCount>
      {comments?.map((comment) => (
        <Comment
          key={comment.id}
          author={comment.user.username}
          payload={comment.payload}
        />
      ))}
      <div>
        <form onSubmit={handleSubmit(onValid)}>
          <input
            {...register("payload", { required: true })}
            type="text"
            placeholder="Write a comment..."
          />
        </form>
      </div>
    </CommentsContainer>
  );
}

export default Comments;
