import React from 'react';
import './App.css';
import Homepage from './pages/Homepage';
import {Route , BrowserRouter , Routes} from 'react-router-dom';
import Logininfo from './pages/Loginpage';
import Registerpage from './pages/Registerpage';
import Productinfo from './pages/Productinfo';
import Cartpage from './pages/Cartpage';
import Adminpage from './pages/Adminpage';
import './stylesheets/Layout.css'
import './stylesheets/login.css'
import './stylesheets/products.css'
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
              
          </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
