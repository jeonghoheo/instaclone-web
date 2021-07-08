import { gql, useQuery } from "@apollo/client";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane
} from "@fortawesome/free-regular-svg-icons";
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
  margin-bottom: 20px;
`;
const PhotoHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;

const PhotoFile = styled.img`
  width: 100%;
`;

const PhotoData = styled.div`
  padding: 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
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
                  <FontAwesomeIcon size={"2x"} icon={faHeart} />
                </PhotoAction>
                <PhotoAction>
                  <FontAwesomeIcon size={"2x"} icon={faComment} />
                </PhotoAction>
                <PhotoAction>
                  <FontAwesomeIcon size={"2x"} icon={faPaperPlane} />
                </PhotoAction>
              </div>
              <div>
                <FontAwesomeIcon size="2x" icon={faBookmark} />
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
