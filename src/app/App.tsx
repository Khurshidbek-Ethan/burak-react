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

//import Test from "./screens/Test";

// css imports
import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";
import { CartItem } from "../lib/types/search";

/* A <Switch> looks through its children <Route>s and
   renders the first one that matches the current URL. */

function App() {
  const location = useLocation();
  console.log("location:", location);

  const cartJson: string | null = localStorage.getItem("cartData");
  const currentCart = cartJson ? JSON.parse(cartJson) : [];
  const [cartItems, setCartItems] = useState<CartItem[]>(currentCart);

  /** HANDLERS **/
  const onAdd = (input: CartItem) => {
    const exist: any = cartItems.find(
      (item: CartItem) => item._id === input._id
    );
    if (exist) {
      const cartUpdate = cartItems.map((item: CartItem) =>
        item._id === input._id
          ? { ...exist, quantity: exist.quantity + 1 }
          : item
      );
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    } else {
      const cartUpdate = [...cartItems, { ...input }];
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    }
  };

  return (
    <>
      {location.pathname === "/" ? (
        <HomeNavbar cartItems={cartItems} />
      ) : (
        <OtherNavbar cartItems={cartItems} />
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
