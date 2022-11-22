
import './index.css';
import Home from './pages/Home';
import CreateNewProperty from './pages/adminPages/createNewProperty';
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Products from './pages/Products';
import Product from './pages/Product';
import Register from './pages/adminPages/Register';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import PrivateRoutes from './pages/PrivateRoutes';
import Admin from './pages/Admin';
import Users from './pages/adminPages/Users'
import Orders from './pages/adminPages/Orders';
import Properties from './pages/adminPages/Properties'
import Order from './pages/Order';
import JoinForm from './pages/Joinform';
import ApplicationForms from './pages/adminPages/AplicationForms';
import TestPage from './pages/TestPage';
import Buy from './pages/Buy';
import Sell from './pages/Sell';
import Rent from './pages/Rent';
import Manage from './pages/Manage';
import About from './pages/About';

function App() {
  const user = useSelector(state => state.user.currentUser);
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/properties" element={<Products />} />
          <Route path='/property/:id' element={<Product />} />
          <Route element={<PrivateRoutes />}>
            <Route path='/admin' element={<Admin />} />
            <Route path='/admin/users' element={<Users />} />
            <Route path="/admin/users/create" element={<Register />}/>
            <Route path='/admin/joinforms' element={<ApplicationForms />} />
            <Route path='/admin/orders' element={<Orders />} />
            <Route path='/admin/properties' element={<Properties />} />
            <Route path='/admin/properties/create' element={<CreateNewProperty />} />
          </Route>
          <Route path="/join" element={<JoinForm />} />
          <Route path="/login" element={<Login />}/>
          <Route path='/user/order/:id' element={<Order />}/>
          <Route path="/testing" element={<TestPage />}/>
          <Route path="/buy" element={<Buy />}/>
          <Route path="/rent" element={<Rent />}/>
          <Route path="/sell" element={<Sell />}/>
          <Route path="/manage" element={<Manage />}/>
          <Route path="/about" element={<About />} />



        </Routes>
    
    
    </BrowserRouter>
  )
}

export default App;
