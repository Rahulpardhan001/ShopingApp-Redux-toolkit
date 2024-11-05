import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Product from "./Components/Product";
import Cart from "./Components/Cart";
import DetailPage from "./Components/DetailPage";
import Footer from "./Components/Footer";
import Wishlist from "./Components/Wishlist";
import Home from "./Components/Home";
import About from "./Components/About";



function App() {
  return (
    <>
    <Header/>
    
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    
     <Route path='/cart' element={<Cart/>}/>
    <Route path="/detail" element={<DetailPage/>}/>
    <Route path="/wishlist" element={<Wishlist/>}/>
   </Routes>
   <Footer/>
    </>
     );
}

export default App;
