import React from 'react';
import './App.css';
import Homepage from './pages/Homepage';
import {Route , BrowserRouter , Routes} from 'react-router-dom';
import Logininfo from './pages/Loginpage';
import Registerpage from './pages/Registerpage';
import Productinfo from './pages/Productinfo';
import Cartpage from './pages/Cartpage';
import Adminpage from './pages/admin/Adminpage';
import Ordered from './pages/admin/Ordered';
import Returned from './pages/admin/Returned';
// import './stylesheets/Layout.css'
import MaheshStoresHome from './pages/MaheshStoreHome';
// import './stylesheets/Layout.css'
import './stylesheets/products.css'
import './stylesheets/Admin.css'
import './stylesheets/home.css'
import './stylesheets/homemodal.css'
import {Provider} from 'react-redux'


function App() {
  
  return (
     
    <div className="App">
     
        <BrowserRouter>
          <Routes>
              
              <Route path='/' exact element= {<Homepage />} />
              <Route path='/login' exact element={<Logininfo />} />
              <Route path='/register' exact element={<Registerpage />} />
              <Route path='/productinfo/:productid' exact element={<Productinfo />} />
              <Route path='/cart' exact element={<Cartpage />} />
              <Route path='/admin' exact element={<Adminpage/>} />
              <Route path='/admin/orders' exact element={<Ordered/>} />
              <Route path='/admin/returns' exact element={<Returned/>} />
              <Route path='/maheshstores' exact element={<MaheshStoresHome/>} />
              
              
              
              
          </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
