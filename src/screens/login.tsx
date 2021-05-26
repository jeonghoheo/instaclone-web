import {
  faFacebookSquare,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { gql, useMutation } from "@apollo/client";
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
  result: any;
}

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      ok
      token
      error
    }
  }
`;

function Login() {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isValid }
  } = useForm<IFieldValues>({
    mode: "onChange"
  });
  const onCompleted = useCallback(
    (data) => {
      const {
        login: { ok, error, token }
      } = data;
      if (!ok) {
        setError("result", {
          message: error
        });
      }
    },
    [setError]
  );

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted
  });
  const onSubmitValid = useCallback<SubmitHandler<IFieldValues>>(
    (data) => {
      if (loading) {
        return;
      }
      const { username, password } = getValues();

      login({
        variables: { username, password }
      });
    },
    [loading, getValues, login]
  );
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
          <Button type="submit" value="Log in" disabled={!isValid || loading} />
          <FormError message={errors?.result?.message} />
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
