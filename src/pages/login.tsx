import { ApolloError, gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import FormError from "../components/form-error";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";
import Logo from "../images/ubereatslogo.svg";
import Button from "../components/button";
import { Link } from "react-router-dom";

//?아폴로 변수에 $붙임
//mutation이름은 frontend에서만 유효
const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

interface ILoginForm {
  email?: string;
  password?: string;
}

export default function Login() {
  const {
    register,
    getValues,
    watch,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ILoginForm>({
    mode: "onBlur",
  });

  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      console.log(token);
    }
  };

  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
    onError: () => null,
  });

  const onSubmit = () => {
    // console.log(getValues());
    if (!loading) {
      const { email, password } = getValues();
      //!타입 고쳐야 함
      if (email && password) {
        loginMutation({
          variables: {
            loginInput: {
              email,
              password,
            },
          },
        });
      } else {
        //Todo 둘다 없을 시 알림
      }
    }
  };

  return (
    <div className="h-screen flex flex-col items-center mt-10 lg:mt-28">
      <div className="w-full max-w-sreen-sm flex flex-col px-5 items-center">
        <img src={Logo} className="w-52 mb-5" />
        <h4 className="w-full font-medium text-left text-3xl mb-10">
          Welcome back
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full mb-5"
        >
          <input
            {...register("email", { required: "email is required" })}
            type="email"
            placeholder="Email"
            className="input"
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          <input
            {...register("password", {
              required: "password is required",
              minLength: 8,
            })}
            type="password"
            placeholder="Password"
            className="input"
          />
          {errors.password?.type === "minLength" && (
            <FormError errorMessage={"비밀번호는 8자 이상이어야 해요"} />
          )}
          <Button canClick={isValid} loading={loading} actionText={"Login"} />
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
        <div>
          New to Outclass?{" "}
          <Link to="/create-account" className="text-lime-600 hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
