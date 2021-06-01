import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import * as H from "history";
import routes from "./routes";

const TOKEN = "token";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (token: string) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logUserOut = (history: H.History<H.LocationState>) => () => {
  localStorage.removeItem(TOKEN);
  window.location.reload();
  history.replace(routes.home);
  isLoggedInVar(false);
};

export const darkModeVar = makeVar(false);

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
});
