import { useMutation } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import styled from "styled-components";
import AuthLayout from "../components/auth/auth-layout";
import BottomBox from "../components/auth/bottom-box";
import Button from "../components/auth/button";
import FormBox from "../components/auth/form-box";
import Input from "../components/auth/input";
import PageTitle from "../components/auth/page-title";
import { FatLink } from "../components/shared";
import routes from "../routes";

interface IFieldValues {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      input: {
        firstName: $firstName
        lastName: $lastName
        username: $username
        email: $email
        password: $password
      }
    ) {
      ok
      error
    }
  }
`;

function SignUp() {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid }
  } = useForm<IFieldValues>({
    mode: "onChange"
  });

  const onCompleted = useCallback(
    (data) => {
      const {
        createAccount: { ok }
      } = data;
      if (!ok) {
        return;
      }
      const { username, password } = getValues();
      history.push(routes.home, {
        message: "Account created. Please log in.",
        username,
        password
      });
    },
    [history, getValues]
  );
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted
  });

  const onSubmitValid = useCallback<SubmitHandler<IFieldValues>>(
    (data) => {
      if (loading) {
        return;
      }
      createAccount({
        variables: {
          ...data
        }
      });
    },
    [createAccount, loading]
  );
  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("firstName", {
              required: "First Name is required"
            })}
            type="text"
            placeholder="First Name"
            hasError={Boolean(errors.firstName?.message)}
          />
          <Input
            {...register("lastName", {
              required: "Last Name is required"
            })}
            type="text"
            placeholder="Last Name"
            hasError={Boolean(errors.lastName?.message)}
          />
          <Input
            {...register("email", {
              required: "Email is required"
            })}
            type="email"
            placeholder="Email"
            hasError={Boolean(errors.email?.message)}
          />
          <Input
            {...register("username", {
              required: "Username is required"
            })}
            type="text"
            placeholder="Username"
            hasError={Boolean(errors.username?.message)}
          />
          <Input
            {...register("password", {
              required: "Password is required"
            })}
            type="password"
            placeholder="Password"
            hasError={Boolean(errors.password?.message)}
          />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign up"}
            disabled={!isValid || loading}
          />
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" linkText="Log in" link={routes.home} />
    </AuthLayout>
  );
}

export default SignUp;
