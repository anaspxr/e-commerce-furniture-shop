import Navbar from "./components/Navbar";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import LoginSignup from "./pages/LoginSignup";
import Products from "./pages/Products";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import { UserContext, UserProvider } from "./contexts/UserContext";
import Product from "./pages/Product";
import ScrollToTop from "./components/ScrollToTop";
import { CartContextProvider } from "./contexts/CartContext";
import SearchResults from "./pages/SearchResults";
import Checkout from "./pages/Checkout";
import { useContext, useEffect } from "react";
import ScrollToHashElement from "@cascadia-code/scroll-to-hash-element";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <UserProvider>
        <CartContextProvider>
          <BrowserRouter>
            <Navbar />
            <div className="md:pt-24 pt-16 "></div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products">
                <Route index element={<Products category="furniture" />} />
                <Route
                  path="homedecor"
                  element={<Products category="homedecor" />}
                />
                <Route path="sofas" element={<Products category="sofas" />} />
                <Route
                  path="mattresses"
                  element={<Products category="mattresses" />}
                />
                <Route path="dining" element={<Products category="dining" />} />
                <Route
                  path="lightings"
                  element={<Products category="lightings" />}
                />
                <Route
                  path="furnishings"
                  element={<Products category="furnishings" />}
                />
                <Route path=":productID" element={<Product />} />
              </Route>
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<LoginSignup />} />
              <Route path="/search/:query" element={<SearchResults />} />
              <Route element={<PrivateRoutes />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/checkout" element={<Checkout />} />
              </Route>
            </Routes>

            <Footer />
            <ScrollToTop />
            <ScrollToHashElement />
          </BrowserRouter>
        </CartContextProvider>
      </UserProvider>
    </div>
  );
}

function PrivateRoutes() {
  const { currentUserEmail, setRedirectPath } = useContext(UserContext);
  const location = useLocation();

  useEffect(() => {
    if (!currentUserEmail) {
      setRedirectPath(location.pathname);
    }
  }, [currentUserEmail, location.pathname, setRedirectPath]);

  if (!currentUserEmail) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
export default App;
