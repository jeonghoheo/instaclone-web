import { isLoggedInVar } from "../apollo";

const Login = () => (
  <div>
    <h1>login</h1>
    <button
      onClick={() => {
        isLoggedInVar(true);
      }}
    >
      Log in now!
    </button>
  </div>
);

export default Login;
