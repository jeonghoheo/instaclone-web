import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar
} from "@apollo/client";
import * as H from "history";
import routes from "./routes";
import { setContext } from "@apollo/client/link/context";

const TOKEN = "TOKEN";
const DARK_MODE = "DARK_MODE";
const URI = "http://localhost:4000/graphql";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const darkModeVar = makeVar(
  Boolean(localStorage.getItem(DARK_MODE) === "enabled")
);

export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, "enabled");
  darkModeVar(true);
};

export const disableDarkMode = () => {
  localStorage.removeItem(DARK_MODE);
  darkModeVar(false);
};

export const logUserIn = (token: string) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logUserOut = (history: H.History<H.LocationState>) => () => {
  console.log("logout");
  localStorage.removeItem(TOKEN);
  window.location.reload();
  history.replace(routes.home);
  isLoggedInVar(false);
};

const httpLink = createHttpLink({
  uri: URI
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem(TOKEN)
    }
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        keyFields: (user) => `User:${user.username}`
      }
    }
  })
});
