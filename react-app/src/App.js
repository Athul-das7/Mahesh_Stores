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
import AddItems from './pages/admin/AddItems';
import RemoveItems from './pages/admin/RemoveItems';
import Productupdate from './pages/admin/productupdate';
// import Test from './contexts/Test';
import './stylesheets/Layout.css'
import MaheshStoresHome from './pages/MaheshStoreHome';
import History from './pages/admin/History';
// import './stylesheets/Layout.css'
import './stylesheets/products.css'
import './stylesheets/home.css'
import './stylesheets/homemodal.css'
import './stylesheets/Admin.css'
import {Provider} from 'react-redux'
import {AuthProvider} from './contexts/AuthContext'


function App() {
  
  return (
     
    <div className="App">
     
        <BrowserRouter>
          <AuthProvider>
          <Routes>
              
              <Route path='/' exact element={<MaheshStoresHome/>} />
              <Route path='/product' exact element= {<Homepage />} />
              <Route path='/login' exact element={<Logininfo />} />
              <Route path='/register' exact element={<Registerpage />} />
              <Route path='/productinfo/:productid' exact element={<Productinfo />} />
              <Route path='/productupdate/:productid' exact element={<Productupdate />} />
              <Route path='/cart' exact element={<Cartpage />} />
              <Route path='/admin' exact element={<Adminpage/>} />
              <Route path='/admin/orders' exact element={<Ordered/>} />
              <Route path='/admin/returns' exact element={<Returned/>} />
              <Route path='/admin/additems' exact element={<AddItems/>} />
              <Route path='/admin/removeitems' exact element={<RemoveItems/>} />
              <Route path='/admin/history' exact element={<History/>} />
              {/* <Route path='/test' exact element={<Test/>} /> */}
              
              
              
              
          </Routes>
          </AuthProvider>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
