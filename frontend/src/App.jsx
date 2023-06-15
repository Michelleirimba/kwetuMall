import Home from "./pages/Home";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Categories from'./pages/admin/Categories';
import PickupPoints from './pages/admin/PickupPoint';
import ProductDetails from './pages/users/ProductDetails';
import Products from "./pages/admin/Products";
import MyUserAccount from "./pages/users/MyAccount";
import Register from "./pages/users/auth/Register";
import Login from "./pages/users/auth/Login";
import CartDetails from "./pages/users/CartDetails";
import AdminHome from "./pages/admin/Home";
import Users from "./pages/admin/Users";
import AdminRegister from "./pages/admin/auth/Register";
import AdminLogin from "./pages/admin/auth/Login";
import Admins from "./pages/admin/Admins";
import MyAccount from "./pages/admin/MyAccount";

function App  () {
return(
    <div>
    <BrowserRouter>
    <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path= '/productdetails/:id' element={<ProductDetails/>}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/login'  element={<Login/>}/>
        <Route exact path='/cart'  element={<CartDetails/>}/>
        <Route exact path='/myaccount'  element={<MyUserAccount/>}/>
         {/* {admin} */}
        <Route exact path= '/admin/categories' element={<Categories/>} />
        <Route exact path= '/admin/pickuppoints' element={<PickupPoints/>}/>
        <Route exact path= '/admin/products' element ={<Products/>}/>
        <Route exact path= '/admin' element ={<AdminHome/>}/>
        <Route exact path= '/admin/users' element ={<Users/>}/>
        <Route exact path= '/admin/register' element ={<AdminRegister/>}/>
        <Route exact path= '/admin/login' element ={<AdminLogin/>}/>
        <Route exact path= '/admin/admins' element ={<Admins/>}/>
        <Route exact path= '/admin/myaccount' element ={<MyAccount/>}/>
    </Routes>
    </BrowserRouter>
    </div>
)
}
   
export default App