import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import CreateAccount from "../pages/create-account";
import NotFound from "../pages/404";

interface IForm {
  email: string;
  password: string;
}

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
