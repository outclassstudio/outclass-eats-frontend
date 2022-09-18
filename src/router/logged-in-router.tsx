import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Restaurants from "../pages/client/restaurants";
import Header from "../components/header";
import { useMe } from "../hooks/useMe";
import ConfirmEamil from "../pages/user/confirm-email";

const ClientRoutes = [
  <Route path="/" element={<Restaurants />} />,
  <Route path="/confirm" element={<ConfirmEamil />} />,
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();

  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-lg tracking-wide">Loading...</span>
      </div>
    );
  }

  return (
    <Router>
      <Header />
      <Routes>
        {data.me.role === "Client" && ClientRoutes}
        //!수정필요
        {/* <Route path="/" element={<Navigate replace to="/" />} /> */}
      </Routes>
    </Router>
  );
};
