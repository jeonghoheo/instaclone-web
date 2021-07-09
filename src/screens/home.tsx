import { gql, useQuery } from "@apollo/client";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router";
import styled from "styled-components";
import { logUserOut } from "../apollo";
import Avatar from "../components/avatar";
import { FatText } from "../components/shared";
import { seeFeed } from "../__generated__/seeFeed";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      ok
      error
      photos {
        id
        isLiked
        user {
          username
          avatar
        }
        file
        caption
        likes
        comments
        createdAt
        isMine
      }
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
`;
const Likes = styled(FatText)`
  margin-top: 15px;
  display: block;
`;

function Home() {
  const { data } = useQuery<seeFeed>(FEED_QUERY);
  const history = useHistory();
  return (
    <div>
      <h1>Welcome we did it!</h1>
      <button onClick={logUserOut(history)}>Log out now!</button>
      {data?.seeFeed.photos?.map((photo) => (
        <PhotoContainer key={photo.id}>
          <PhotoHeader>
            <Avatar url={photo.user?.avatar || ""} lg />
            <Username>{photo.user?.username}</Username>
          </PhotoHeader>
          <PhotoFile src={photo.file} />
          <PhotoData>
            <PhotoActions>
              <div>
                <PhotoAction>
                  <FontAwesomeIcon
                    style={{ color: photo.isLiked ? "tomato" : "inherit" }}
                    icon={photo.isLiked ? SolidHeart : faHeart}
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
              {photo.likes && photo.likes > 1
                ? `${photo.likes} likes`
                : photo.likes
                ? `${photo.likes} like`
                : `0 like`}
            </Likes>
          </PhotoData>
        </PhotoContainer>
      ))}
    </div>
  );
}

export default Home;
