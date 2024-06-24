import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import LoginSignup from "./pages/LoginSignup";
import Categories from "./pages/Categories";
import Product from "./pages/Product";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/furniture"
            element={<Categories category="furniture" />}
          />
          <Route
            path="/homedecor"
            element={<Categories category="homedecor" />}
          />
          <Route path="/sofas" element={<Categories category="sofas" />} />
          <Route path="/dining" element={<Categories category="dining" />} />
          <Route path="/product" element={<Product />}>
            <Route path=":productID" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
