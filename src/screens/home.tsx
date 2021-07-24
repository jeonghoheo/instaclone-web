import { gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router";
import { logUserOut } from "../apollo";
import PageTitle from "../components/auth/page-title";
import Photo from "../components/feed/photo";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import { seeFeed } from "../__generated__/seeFeed";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      ok
      error
      photos {
        ...PhotoFragment
        user {
          username
          avatar
        }
        caption
        comments {
          ...CommentFragment
        }
        createdAt
        isMine
      }
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

function Home() {
  const { data } = useQuery<seeFeed>(FEED_QUERY);
  const history = useHistory();
  return (
    <div>
      <PageTitle title="Home" />
      <h1>Welcome we did it!</h1>
      <button onClick={logUserOut(history)}>Log out now!</button>
      {data?.seeFeed.photos?.map((photo) => (
        <Photo key={photo.id} {...photo} />
      ))}
    </div>
  );
}

export default Home;
