import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import FormError from "../components/form-error";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";

//?아폴로 변수에 $붙임
//mutation이름은 frontend에서만 유효
const LOGIN_MUTATION = gql`
  mutation loginMutation($email: String, $password: String) {
    login(input: { email: $email, password: $password }) {
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
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginForm>();

  const [loginMutation, { loading, error, data }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION);

  const onSubmit = () => {
    // console.log(getValues());
    const { email, password } = getValues();
    loginMutation({
      variables: {
        email,
        password,
      },
    });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg pt-8 pb-7 py-10 rounded-lg">
        <h3 className="flex justify-center text-2xl text-gray-800">Login</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col mt-5 px-5"
        >
          <input
            {...register("email", { required: "email is required" })}
            type="email"
            placeholder="Email"
            className="mb-3 input"
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
          <button className="mt-3 btn">Login</button>
        </form>
      </div>
    </div>
  );
}
