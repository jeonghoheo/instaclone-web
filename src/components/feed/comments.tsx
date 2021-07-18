import { gql, MutationUpdaterFn, useMutation } from "@apollo/client";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import useUser from "../../hooks/useUser";
import {
  createComment,
  createCommentVariables
} from "../../__generated__/createComment";
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
      id
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

const PostCommentContainer = styled.div`
  margin-top: 10px;
  padding-top: 15px;
  padding-bottom: 10px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;

const PostCommentInput = styled.input`
  width: 100%;
  &::placeholder {
    font-size: 12px;
  }
`;

function Comments({
  author,
  payload,
  commentNumber,
  comments,
  photoId
}: IProps) {
  const { data: userData } = useUser();
  const { register, handleSubmit, setValue, getValues } =
    useForm<IFieldValues>();
  const createComment = useCallback<MutationUpdaterFn<createComment>>(
    (cache, result) => {
      const { payload } = getValues();
      setValue("payload", "");
      const {
        createComment: { ok, id }
      } = result.data as createComment;
      if (ok && userData?.me) {
        const newComment = {
          __typename: "Comment",
          createdAt: Date.now().toString(),
          id,
          isMine: true,
          payload,
          user: {
            ...userData.me
          }
        };
        cache.modify({
          id: `Photo:${photoId}`,
          fields: {
            comments(prev) {
              return [...prev, newComment];
            },
            commentNumber(prev) {
              return prev + 1;
            }
          }
        });
      }
    },
    [getValues, setValue, userData, photoId]
  );
  const [createCommentMutation, { loading }] = useMutation<
    createComment,
    createCommentVariables
  >(CREATE_COMMENT_MUTATION, {
    update: createComment
  });
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
    },
    [photoId, createCommentMutation, loading]
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
      <PostCommentContainer>
        <form onSubmit={handleSubmit(onValid)}>
          <PostCommentInput
            {...register("payload", { required: true })}
            type="text"
            placeholder="Write a comment..."
          />
        </form>
      </PostCommentContainer>
    </CommentsContainer>
  );
}

export default Comments;
