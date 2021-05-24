import {
  faFacebookSquare,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import AuthLayout from "../components/auth/auth-layout";
import BottomBox from "../components/auth/bottom-box";
import Button from "../components/auth/button";
import FormBox from "../components/auth/form-box";
import FormError from "../components/auth/form-error";
import Input from "../components/auth/input";
import PageTitle from "../components/auth/page-title";
import Separator from "../components/auth/separator";
import routes from "../routes";

interface IFieldValues {
  username: string;
  password: string;
}

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<IFieldValues>({
    mode: "onChange"
  });
  const onSubmitValid = useCallback<SubmitHandler<IFieldValues>>((data) => {
    console.log(data);
  }, []);
  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("username", {
              required: "Username is required.",
              minLength: {
                value: 5,
                message: "Username should be longer than 5 characters."
              }
            })}
            type="text"
            hasError={Boolean(errors.username?.message)}
            placeholder="Username"
          />
          <FormError message={errors.username?.message} />
          <Input
            {...register("password", {
              required: "Password is required."
            })}
            type="password"
            hasError={Boolean(errors.password?.message)}
            placeholder="Password"
          />
          <FormError message={errors.password?.message} />
          <Button type="submit" value="Log in" disabled={!isValid} />
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
}

export default Login;
