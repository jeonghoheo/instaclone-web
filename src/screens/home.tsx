import { gql, useQuery } from "@apollo/client";
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
  padding: 5px 10px;
  display: flex;
  align-items: center;
`;

const Username = styled(FatText)`
  margin-left: 5px;
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
            <Avatar url={photo.user?.avatar || ""} />
            <Username>{photo.user?.username}</Username>
          </PhotoHeader>
        </PhotoContainer>
      ))}
    </div>
  );
}

export default Home;
