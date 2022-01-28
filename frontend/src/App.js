import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Login from "./components/common/Login";
import Navbar from "./components/templates/Navbar";
import NavbarBuyer from "./components/templates/NavbarBuyer"
import NavbarVendor from "./components/templates/NavbarVendors";
import BuyerProfile from "./components/common/buyerProfile";
import BuyerWallet from "./components/common/buyerWallet";
import BuyerOrder from "./components/common/buyerOrders";
import BuyerDashboard from "./components/common/buyerDashboard";
import BuyerLogout from "./components/common/buyerLogout";
import VendorProfile from "./components/common/venderProfile";
import VendorLogout from "./components/common/vendorLogout";
import VendorFoodDashboard from "./components/common/vendorFoodDashboard";
import VendorAddFoodItems from "./components/common/vendorAddFoodItems";
import VendorOrdersList from "./components/common/vendorOrdersList";
import EditFoodItem from "./components/common/editFoodItem";

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

const LayoutVendor = () => {
  return (
    <div>
      <NavbarVendor />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}
 
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
          <Route path="buyerOrders" element={<BuyerOrder />} />
          <Route path="buyerWallet" element={<BuyerWallet />} />
          <Route path="buyerDashboard" element={<BuyerDashboard/>}/>
          <Route path="buyerLogout"element={<BuyerLogout/>}/>
        </Route>
        <Route path="/" element={<LayoutVendor />}>
          <Route path="vendorProfile" element={<VendorProfile />} />
          <Route path="vendorFoodDashboard" element={<VendorFoodDashboard />} />
          <Route path="vendorAddFoodItems"element={<VendorAddFoodItems/>}/>
          <Route path="vendorOrdersList"element={<VendorOrdersList/>}/>
          <Route path="vendorLogout"element={<VendorLogout/>}/>
          <Route path="EditFoodItem"element={<EditFoodItem/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
