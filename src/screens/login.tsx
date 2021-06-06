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
import { logUserIn } from "../apollo";
import { useLocation } from "react-router";
import { login, loginVariables } from "../__generated__/login";

interface IFieldValues extends loginVariables {
  result?: string;
}

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Notification = styled.div`
  color: #2ecc71;
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
  const location =
    useLocation<{ message?: string; username?: string; password?: string }>();
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isValid }
  } = useForm<IFieldValues>({
    mode: "onChange",
    defaultValues: {
      username: location?.state?.username || "",
      password: location?.state?.password || ""
    }
  });
  const onCompleted = useCallback(
    (data) => {
      const {
        login: { ok, error, token }
      } = data;
      if (!ok) {
        return setError("result", {
          message: error
        });
      }
      if (token) {
        logUserIn(token);
      }
    },
    [setError]
  );

  const clearLoginError = useCallback(() => {
    clearErrors("result");
  }, [clearErrors]);

  const [login, { loading }] = useMutation<login, loginVariables>(
    LOGIN_MUTATION,
    {
      onCompleted
    }
  );
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

  const usernameRegister = register("username", {
    shouldUnregister: true,
    required: "Username is required.",
    minLength: {
      value: 5,
      message: "Username should be longer than 5 characters."
    }
  });

  const passwordRegister = register("password", {
    shouldUnregister: true,
    required: "Password is required.",
    minLength: {
      value: 2,
      message: "Password should be longer than 2 characters."
    }
  });

  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <Notification>{location?.state?.message}</Notification>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...usernameRegister}
            onChange={(event) => {
              clearLoginError();
              usernameRegister.onChange(event);
            }}
            type="text"
            hasError={Boolean(errors.username?.message)}
            placeholder="Username"
          />
          <FormError message={errors.username?.message} />
          <Input
            {...passwordRegister}
            onChange={(event) => {
              clearLoginError();
              passwordRegister.onChange(event);
            }}
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
