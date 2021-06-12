import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo";
import { me } from "../__generated__/me";

const ME_QUERY = gql`
  query me {
    me {
      ok
      error
      me {
        id
        avatar
      }
    }
  }
`;

function useUser() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data, error } = useQuery<me>(ME_QUERY, {
    skip: !isLoggedIn
  });
  console.log(data, error);
  return {};
}

export default useUser;
