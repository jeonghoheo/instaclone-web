import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./screens/home";
import Login from "./screens/login";
import NotFound from "./screens/not-found";

function App() {
  const isLoggedIn = false;
  return (
    <div>
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
    </div>
  );
}

export default App;
