import { isLoggedInVar } from "../apollo";

export const LoggedOutRouter = () => {
  const onClick = () => {
    isLoggedInVar(true);
  };

  return (
    <div>
      <h1>LoggedOut</h1>
      <button onClick={onClick}>login</button>
    </div>
  );
};
