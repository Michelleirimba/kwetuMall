import Home from "./pages/Home";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import CategoryHome from'./pages/admin/Categories';
import PickupPoint from './pages/admin/PickupPoint';
import ProductDetails from './pages/users/ProductDetails';
import Products from "./pages/admin/Products";
import Register from "./pages/users/auth/Register";
import Login from "./pages/users/auth/Login";
import CartDetails from "./pages/users/CartDetails";

function App  () {
return(
    <div>
    <BrowserRouter>
    <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path= '/categories/home' element={<CategoryHome/>} />
        <Route exact path= '/pickuppoint' element={<PickupPoint/>}/>
        <Route exact path= '/productdetails/:id' element={<ProductDetails/>}/>
        <Route exact path= '/products' element ={<Products/>}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/login'  element={<Login/>}/>
        <Route exact path='/cart'  element={<CartDetails/>}/>
    </Routes>
    </BrowserRouter>
    </div>
)
}
   
export default App