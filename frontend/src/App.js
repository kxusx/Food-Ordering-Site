import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Login from "./components/common/Login";
import Navbar from "./components/templates/Navbar";
import NavbarBuyer from "./components/templates/NavbarBuyer"
import Profile from "./components/users/Profile";
import BuyerProfile from "./components/common/buyerProfile";
import BuyerSearch from "./components/common/buyerSearch";
import BuyerWallet from "/components/common/buyerWallet";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

const LayoutBuyer = () => {
  return (
    <div>
      <NavbarBuyer />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};
 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/" element={<LayoutBuyer />}>
          <Route path="buyerProfile" element={<BuyerProfile />} />
          <Route path="buyerSearch" element={<buyerSearch />} />
          <Route path="buyerSearch" element={<BuyerWallet />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
