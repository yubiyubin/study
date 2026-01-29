import { Routes, Route } from "react-router";
import "./App.css";
import { HomePage } from "./Pages/HomePage";
import { CheckoutPage } from "./Pages/checkout/CheckoutPage";
import { OrdersPage } from "./Pages/OrdersPage";
import { TrackingPage } from "./Pages/TrackingPage";
import { Page404 } from "./Pages/Page404";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    axios.get("/api/cart-items").then((response) => {
      setCart(response.data);
    });
  }, []);
  return (
    <Routes>
      <Route index element={<HomePage cart={cart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="orders" element={<OrdersPage />} />
      <Route path="tracking" element={<TrackingPage />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
