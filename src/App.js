import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home';
import Aboutus from './components/aboutus';
import Contactus from './components/Contactus';
//import products from './components/Products';
import Signin from './components/Signin';
import Signup from './components/Signup';
import FAQ from './components/faq';
import Footer from './components/footer';
import RefundPolicy from './components/refundpolicy';
import PrivacyPolicy from './components/privacypolicy';
import TermsAndConditions from './components/termsandcondition';
import CartPage from './components/CartPage';
import { CartProvider } from './context/CartContext';
import FacialCreams from './components/FacialCreams';
import ProductDetail from './components/ProductDetail';
import RowAndColumnSpacing from './footer';
import Produ from './components/ProductsSection';
import AdminLogin from './components/admin';
import OrderForm from './components/orderform';
import CategoryCards from './components/categorycard';
import CategoryImages from './components/categorycard';
import SkincareProductsPage from './components/skincare';
import ProductAdmin from './components/ProductAdmin';
import AdminProductManager from './components/ProductManagement';
import AdminDashboard from './components/userlist';
import UserProfile from './components/userprofile';
import CheckoutComplete from './components/checkoutcomplete';
import CheckoutPayment from './components/checkoutpayment';
import CheckoutPage from './components/checkoutpage';
import Checkout from './components/checkoutcomplete';
import AdminOrders from './components/adorder';
import AdminOrdersPage from './components/AdminOrderManger';
import AdminOrdersp from './components/AdminOrderManger';
//import { Home } from '@mui/icons-material';
function App() {
  return (
    <CartProvider>
      <Router>
  
        <Navbar />
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/categorycard" element={<CategoryCards/>}/>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/Products" element={<FacialCreams/>} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/skincare" element={<SkincareProductsPage/>}/>
          <Route path="/termsandcondition" element={<TermsAndConditions/>} />
          <Route path="/privacypolicy" element={<PrivacyPolicy/>} />
          <Route path="/refundpolicy" element={<RefundPolicy/>} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/ProductDetail" element={<ProductDetail />} />
          <Route path="/order" element={<OrderForm/>}></Route>
          <Route path="/productmanagement" element={<AdminProductManager/>} />
          <Route path="/userlist" element={<AdminDashboard/>} />
        </Routes>
        <Footer/>
        <UserProfile/>
        <CheckoutPage/>
        <Checkout/>
        <AdminOrders/>
      </Router>
    </CartProvider>
  );
}

export default App;
