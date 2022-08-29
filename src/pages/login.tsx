import { useForm } from "react-hook-form";

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

  const onSubmit = () => {
    console.log(getValues());
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
            <span className="text-medium text-red-600">
              {errors.email?.message}
            </span>
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
            <span className="text-medium text-red-600">
              비밀번호는 8자 이상이어야 해요
            </span>
          )}
          <button className="mt-3 btn">Login</button>
        </form>
      </div>
    </div>
  );
}
