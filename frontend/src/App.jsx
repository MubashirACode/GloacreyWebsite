import { Route, Routes, useLocation } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { Home } from "./pages/Home"
import { Toaster } from "react-hot-toast"
import { Footer } from "./components/Footer"
import { useAppContext } from "./context/AppContext"
import { Login } from "./components/Login"
import { AllProducts } from "./pages/AllProducts"
import { ProductsCategory } from "./pages/ProductsCategory"
import { ProductDetails } from "./pages/ProductDetails"
import { Cart } from "./pages/Cart"
import { AddAddress } from "./pages/AddAddress"
import { MyOrders } from "./pages/MyOrders"
import { SellerLogin } from "./components/seller/SellerLogin"
import { SellerLayout } from "./pages/seller/SellerLayout"
import { AddProducts } from "./pages/seller/AddProducts"
import { ProductList } from "./pages/seller/ProductList"
import { Order } from "./pages/seller/Order"
import { Loading } from "./components/Loading"


function App() {
  const location = useLocation()
  const isSellerPath = location.pathname.includes("seller")
  const { showUserLogin, isSeller } = useAppContext()

  return (
    <div className="text-default min-h-screen text-gray-700 bg-white ">

      {!isSellerPath && <Navbar />}
      {showUserLogin && <Login />}
      <Toaster />

      <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductsCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/loader" element={<Loading />} />


          <Route path="/seller" element={isSeller ? <SellerLayout /> : <SellerLogin />}  >

            <Route index element={isSeller ? <AddProducts /> : null} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="orders" element={<Order />} />

          </Route>



          {/* Optional: 404 fallback */}

        </Routes>
      </div>

      {!isSellerPath && <Footer />}
    </div>
  )
}

export default App
