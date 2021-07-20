import { gql, MutationUpdaterFn, useMutation } from "@apollo/client";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  seeFeed_seeFeed_photos,
  seeFeed_seeFeed_photos_comments_user
} from "../../__generated__/seeFeed";
import {
  toggleLike,
  toggleLikeVariables
} from "../../__generated__/toggleLike";
import Avatar from "../avatar";
import { FatText } from "../shared";
import Comments from "./comments";

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const PhotoContainer = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  margin-bottom: 60px;
`;

const PhotoHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid rgb(239, 239, 239);
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;

const PhotoFile = styled.img`
  min-width: 100%;
  max-width: 100%;
`;

const PhotoData = styled.div`
  padding: 12px 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 20px;
  }
`;

const PhotoAction = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;
const Likes = styled(FatText)`
  margin-top: 15px;
  display: block;
`;

function Photo({
  id,
  user,
  file,
  isLiked,
  likes,
  caption,
  commentNumber,
  comments
}: seeFeed_seeFeed_photos) {
  const updateToggleLike = useCallback<MutationUpdaterFn<toggleLike>>(
    (cache, result) => {
      const {
        toggleLike: { ok }
      } = result.data as toggleLike;
      if (ok) {
        const photoId = `Photo:${id}`;
        cache.modify({
          id: photoId,
          fields: {
            isLiked(prev) {
              return !prev;
            },
            likes(prev) {
              if (isLiked) {
                return prev - 1;
              }
              return prev + 1;
            }
          }
        });
      }
    },
    [id, isLiked]
  );

  const [toggleLikeMutation] = useMutation<toggleLike, toggleLikeVariables>(
    TOGGLE_LIKE_MUTATION,
    {
      variables: {
        id: id
      },
      update: updateToggleLike
    }
  );
  return (
    <PhotoContainer>
      <PhotoHeader>
        <Link to={`/users/${user?.username}`}>
          <Avatar lg url={user?.avatar || ""} />
        </Link>
        <Link to={`/users/${user?.username}`}>
          <Username>{user?.username}</Username>
        </Link>
      </PhotoHeader>
      <PhotoFile src={file} />
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction
              onClick={() => {
                toggleLikeMutation();
              }}
            >
              <FontAwesomeIcon
                style={{ color: isLiked ? "tomato" : "inherit" }}
                icon={isLiked ? SolidHeart : faHeart}
              />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faComment} />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faPaperPlane} />
            </PhotoAction>
          </div>
          <div>
            <FontAwesomeIcon icon={faBookmark} />
          </div>
        </PhotoActions>
        <Likes>
          {likes && likes > 1
            ? `${likes} likes`
            : likes
            ? `${likes} like`
            : `0 like`}
        </Likes>
        <Comments
          author={(user as seeFeed_seeFeed_photos_comments_user).username}
          payload={caption}
          commentNumber={commentNumber as number}
          comments={comments}
          photoId={id}
        />
      </PhotoData>
    </PhotoContainer>
  );
}
export default Photo;
