import { gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router";
import { logUserOut } from "../apollo";
import Photo from "../components/feed/photo";
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

function Home() {
  const { data } = useQuery<seeFeed>(FEED_QUERY);
  const history = useHistory();
  return (
    <div>
      <h1>Welcome we did it!</h1>
      <button onClick={logUserOut(history)}>Log out now!</button>
      {data?.seeFeed.photos?.map((photo) => (
        <Photo key={photo.id} {...photo} />
      ))}
    </div>
  );
}

export default Home;
