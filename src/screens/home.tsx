import { gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router";
import { logUserOut } from "../apollo";

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

function Home() {
  const { data } = useQuery(FEED_QUERY);
  console.log(data);
  return <div></div>;
}

export default Home;
