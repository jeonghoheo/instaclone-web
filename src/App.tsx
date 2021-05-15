import { useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { isLoggedInVar } from "./apollo";
import Home from "./screens/home";
import Login from "./screens/login";
import NotFound from "./screens/not-found";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Home /> : <Login />}
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
