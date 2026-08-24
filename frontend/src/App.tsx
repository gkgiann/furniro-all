import { BrowserRouter, Route, Routes } from "react-router";
import { RootLayout } from "./layout";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import { Cart } from "./pages/Cart";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Shop } from "./pages/Shop";
import { SingleProduct } from "./pages/SingleProduct";
import { NotFound } from "./components/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:category" element={<Shop />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/product/slug/:slug" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            {/* US-11 checkout and US-15 contact will be added here in Sprint 2 */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
