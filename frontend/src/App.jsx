import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import LoginSignup from "./pages/LoginSignup";
import Categories from "./pages/Categories";
import Product from "./pages/Product";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <div className="md:mt-28 mt-20"></div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category">
            <Route index element={<Categories category="furniture" />} />
            <Route path="all" element={<Categories category="furniture" />} />
            <Route
              path="homedecor"
              element={<Categories category="homedecor" />}
            />
            <Route path="sofas" element={<Categories category="sofas" />} />
            <Route
              path="mattresses"
              element={<Categories category="mattresses" />}
            />
            <Route path="dining" element={<Categories category="dining" />} />
            <Route
              path="lightings"
              element={<Categories category="lightings" />}
            />
            <Route
              path="furnishings"
              element={<Categories category="furnishings" />}
            />
          </Route>
          <Route path="/product" element={<Product />}>
            <Route path=":productID" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
