import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "./apollo";
import { LoggedInRouter } from "./router/logged-in-router";
import { LoggedOutRouter } from "./router/logged-out-router";

//?Query정의
//!클라이언트 캐시에 요청하기(중간에 주석쓰면 에러남)
const IS_LOGGED_IN = gql`
  query inLoggedIn {
    isLoggedIn @client
  }
`;

function App() {
  //?기존방식
  // const {
  //   data: { isLoggedIn },
  // } = useQuery(IS_LOGGED_IN);
  //!hook을 사용하는 방식
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  console.log(isLoggedIn);

  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
}

export default App;
