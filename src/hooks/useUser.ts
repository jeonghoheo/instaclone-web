import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../apollo";
import { me } from "../__generated__/me";
import { useHistory } from "react-router-dom";

export const ME_QUERY = gql`
  query me {
    me {
      ok
      error
      me {
        id
        username
        avatar
        totalFollowing
        totalFollowers
      }
    }
  }
`;

function useUser() {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery<me>(ME_QUERY, {
    skip: !hasToken
  });
  const history = useHistory();
  useEffect(() => {
    if (data?.me?.me === null) {
      logUserOut(history)();
    }
  }, [data, history]);
  return { data };
}

export default useUser;
