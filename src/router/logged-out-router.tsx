import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import CreateAccount from "../pages/create-account";

interface IForm {
  email: string;
  password: string;
}

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
      </Routes>
    </Router>
  );
};
