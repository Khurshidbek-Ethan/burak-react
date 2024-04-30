import React, { useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import ProductsPage from "./screens/productsPage";
import OrdersPage from "./screens/ordersPage";
import UserPage from "./screens/userPage";
import HomePage from "./screens/homePage";
import HomeNavbar from "./components/headers/HomeNavbar";
import OtherNavbar from "./components/headers/OtherNavbar";
import Footer from "./components/footer";
import HelpPage from "./screens/helpPage";
import useBasket from "./hooks/useBasket";
import AuthenticationModal from "./components/auth";
import { sweetErrorHandling, sweetTopSuccessAlert } from "../lib/sweetAlert";
import { Messages } from "../lib/config";
import MemberService from "./services/MemberService";
import { useGlobals } from "./hooks/useGlobals";
import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";
function App() {
  const location = useLocation();
  const { setAuthMember } = useGlobals();
  console.log("location:", location);
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();
  const [signupOpen, setSignupOpen] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  /** HANDLERS **/
  const handleSignupClose = () => setSignupOpen(false);
  const handleLoginClose = () => setLoginOpen(false);

  const handleLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseLogout = () => setAnchorEl(null);
  const handleLogoutRequest = async () => {
    try {
      const member = new MemberService();
      await member.logout();

      await sweetTopSuccessAlert("success", 700);
      setAuthMember(null);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(Messages.error1);
    }
  };

  return (
    <>
      {location.pathname === "/" ? (
        <HomeNavbar
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setSignupOpen={setSignupOpen}
          setLoginOpen={setLoginOpen}
          anchorEl={anchorEl}
          handleLogoutClick={handleLogoutClick}
          handleCloseLogout={handleCloseLogout}
          handleLogoutRequest={handleLogoutRequest}
        />
      ) : (
        <OtherNavbar
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setSignupOpen={setSignupOpen}
          setLoginOpen={setLoginOpen}
          anchorEl={anchorEl}
          handleLogoutClick={handleLogoutClick}
          handleCloseLogout={handleCloseLogout}
          handleLogoutRequest={handleLogoutRequest}
        />
      )}
      <Switch>
        <Route path="/products">
          <ProductsPage onAdd={onAdd} />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/member-page">
          <UserPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/">
          {/* <Test /> */}
          <HomePage />
        </Route>
      </Switch>
      <Footer />

      <AuthenticationModal
        signupOpen={signupOpen}
        loginOpen={loginOpen}
        handleLoginClose={handleLoginClose}
        handleSignupClose={handleSignupClose}
      />
    </>
  );
}

export default App;

// import React from "react";
// import { Box, Button, Container, Stack, Typography } from "@mui/material";
// import { Link, Route, Switch, useLocation } from "react-router-dom";
// import HomePage from "./screens/homePage";
// import ProductsPage from "./screens/userPage";
// import OrdersPage from "./screens/ordersPage";
// import UserPage from "./screens/userPage";
// import HomeNavbar from "./components/headers/HomeNavbar";
// import OtherNavbar from "./components/headers/OtherNavbar";
// import Footer from "./components/footer";
// import HelpPage from "./screens/helpPage";
// import "../css/app.css";
// import "../css/navbar.css";
// import "../css/footer.css";
// import Test from "./screens/Test";

// function App() {
//   const location = useLocation();
//   //  console.log("location:",location);

//   return (
//     <>
//       {location.pathname === "/" ? <HomeNavbar /> : <OtherNavbar />}

//       <Switch>
//         <Route path="/products">
//           <ProductsPage />
//         </Route>
//         <Route path="/orders">
//           <OrdersPage />
//         </Route>
//         <Route path="/member-page">
//           <UserPage />
//         </Route>
//         <Route path="/help">
//           <HelpPage />
//         </Route>
//         <Route path="/">
//           <HomePage />
//         </Route>
//       </Switch>
//       <Footer />
//     </>
//   );
// }

// export default App;
