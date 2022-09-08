import { gql, useMutation } from "@apollo/client";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/button";
import FormError from "../components/form-error";
import Logo from "../images/ubereatslogo.svg";
import {
  createAccountMutation,
  createAccountMutationVariables,
} from "../__generated__/createAccountMutation";
import { UserRole } from "../__generated__/globalTypes";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

interface ICreateAcoountForm {
  email?: string;
  password?: string;
  role?: UserRole;
}

export default function CreateAccount() {
  const navigate = useNavigate();
  const {
    register,
    getValues,
    watch,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ICreateAcoountForm>({
    mode: "onChange",
    // defaultValues : {
    //   role: UserRole.Client
    // }
  });
  const onCompleted = (data: createAccountMutation) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      navigate("/login");
    }
  };
  const [
    createAccountMutation,
    { data: createAccountMutationResult, loading },
  ] = useMutation<createAccountMutation, createAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );

  const onSubmit = () => {
    if (!loading) {
      const { email, password, role } = getValues();
      if (email && password && role) {
        createAccountMutation({
          variables: {
            createAccountInput: {
              email,
              password,
              role,
            },
          },
        });
      } else {
        alert("정보를 다 입력해주세요");
      }
    }
  };

  return (
    <div className="h-screen flex flex-col items-center mt-10 lg:mt-28">
      <Helmet>
        <title>Create Account | Outclass Eats</title>
      </Helmet>
      <div className="w-full max-w-sreen-sm flex flex-col px-5 items-center">
        <img src={Logo} className="w-52 mb-5" />
        <h4 className="w-full font-medium text-left text-3xl mb-3">
          Let's get started
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full mb-5"
        >
          <input
            {...register("email", {
              required: "email is required",
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            type="email"
            placeholder="Email"
            className="input"
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          {errors.email?.type === "pattern" && (
            <FormError errorMessage={"유효하지 않은 이메일이에요"} />
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
          <select
            {...register("role", {
              required: "user role is required",
            })}
            className="input"
          >
            {Object.keys(UserRole).map((role, idx) => {
              return <option key={idx}>{role}</option>;
            })}
          </select>
          <Button
            canClick={isValid}
            loading={loading}
            actionText={"Create Account"}
          />
          {createAccountMutationResult?.createAccount.error && (
            <FormError
              errorMessage={createAccountMutationResult.createAccount.error}
            />
          )}
        </form>
        <div>
          계정이 이미 있으신가요?{" "}
          <Link to="/login" className="text-lime-600 hover:underline">
            Login Now
          </Link>
        </div>
      </div>
    </div>
  );
}
