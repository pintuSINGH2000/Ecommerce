import './App.css';
import {Routes,Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/authPage/Login';
import Register from './pages/authPage/Register';
import ForgotPassword from './pages/authPage/ForgotPassword';
import OtpLogin from './pages/authPage/OtpLogin';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Order from './pages/user/Order';
import Profile from './pages/user/Profile';
import Product from './pages/Admin/Product';
import UpdateProduct from './pages/Admin/UpdateProduct';


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/dashboard" element={<PrivateRoute />} >
      <Route path="user" element={<Dashboard />}/>
      <Route path="user/order" element={<Order />}/>
      <Route path="user/profile" element={<Profile />}/>
      </Route>
      <Route path="/dashboard" element={<AdminRoute />} >
      <Route path="admin" element={<AdminDashboard />}/>
      <Route path="admin/create-category" element={<CreateCategory />}/>
      <Route path="admin/create-product" element={<CreateProduct />}/>
      <Route path="admin/product/:slug" element={<UpdateProduct />}/>
      <Route path="admin/product" element={<Product />}/>
      <Route path="admin/users" element={<Users />}/>
      </Route>
      <Route path="/forgetpassword" element={<ForgotPassword />}/>
      <Route path="/otplogin" element={<OtpLogin />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/contact" element={<Contact />}/>
      <Route path="/policy" element={<Policy />}/>
      <Route path="*" element={<PageNotFound />}/>
    </Routes>
    </>
  );
}

export default App;