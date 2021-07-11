import styled from "styled-components";
import { seeFeed_seeFeed_photos_comments } from "../../__generated__/seeFeed";
import Comment from "./comment";

interface IProps {
  author: string;
  payload?: string | null;
  commentNumber: number;
  comments: seeFeed_seeFeed_photos_comments[] | null;
}

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

function Comments({ author, payload, commentNumber, comments }: IProps) {
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
    </CommentsContainer>
  );
}

export default Comments;
