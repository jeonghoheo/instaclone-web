import {
  faFacebook,
  faFacebookF,
  faFacebookSquare,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import AuthLayout from "../components/auth/auth-layout";
import BottomBox from "../components/auth/bottom-box";
import Button from "../components/auth/button";
import FormBox from "../components/auth/form-box";
import Input from "../components/auth/input";
import Separator from "../components/auth/separator";
import routes from "../routes";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Login = () => (
  <AuthLayout>
    <FormBox>
      <div>
        <FontAwesomeIcon icon={faInstagram} size="3x" />
      </div>
      <form>
        <Input type="text" placeholder="Username" />
        <Input type="password" placeholder="Password" />
        <Button type="submit" value="Log in" />
      </form>
      <Separator />
      <FacebookLogin>
        <FontAwesomeIcon icon={faFacebookSquare} />
        <span>Log in with Facebook</span>
      </FacebookLogin>
    </FormBox>
    <BottomBox
      cta="Don't have an account?"
      linkText="Sign up"
      link={routes.signUp}
    />
  </AuthLayout>
);

export default Login;
