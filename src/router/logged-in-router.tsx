import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { isLoggedInVar } from "../apollo";
import Restaurants from "../pages/client/restaurants";

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

const ClientRoutes = () => {
  return <Route path="/" element={<Restaurants />} />;
};

export const LoggedInRouter = () => {
  const { data, loading, error } = useQuery(ME_QUERY);

  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-lg tracking-wide">Loading...</span>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {data.me.role === "Client" && <ClientRoutes />}
        //!수정필요
        <Route path="/" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
};
