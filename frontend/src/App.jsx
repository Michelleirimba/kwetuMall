import Home from "./pages/Home";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Categories from'./pages/admin/Categories';
import PickupPoints from './pages/admin/PickupPoint';
import ProductDetails from './pages/users/ProductDetails';
import Products from "./pages/admin/Products";
import Register from "./pages/users/auth/Register";
import Login from "./pages/users/auth/Login";
import CartDetails from "./pages/users/CartDetails";
import AdminHome from "./pages/admin/Home";
import Users from "./pages/admin/Users";

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
         {/* {admin} */}
        <Route exact path= '/admin/categories' element={<Categories/>} />
        <Route exact path= '/admin/pickuppoints' element={<PickupPoints/>}/>
        <Route exact path= '/admin/products' element ={<Products/>}/>
        <Route exact path= '/admin' element ={<AdminHome/>}/>
        <Route exact path= '/admin/users' element ={<Users/>}/>
    </Routes>
    </BrowserRouter>
    </div>
)
}
   
export default App