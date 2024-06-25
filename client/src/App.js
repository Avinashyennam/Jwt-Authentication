// import logo from './logo.svg';
import React from 'react';
import Home from './components/Home';
import About from './components/About';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Admin from './components/Admin';
import AuthProvider  from './AuthProvider';
// import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/PrivateRoute';

// const user = useAuth();
// const router = createBrowserRouter(
//   createRoutesFromElements(
//   <>
//     <Route path='/login' element={<Login />} />
    // <Route path='/' element={<Home />} />
    // <Route path='/about' element = {<About />} />
    // <Route element = {<PrivateRoute />}>
    //   <Route path='/dashboard' element = {<Dashboard />} />
    // </Route>
//     {/* <Route path='/dashboard' element = {<PrivateRoute />?<Dashboard />:<Login />} />  */}
//     {/* <Route path='/dashboard' element = {<Dashboard />} /> */}
//   </>
//   )
// )

function App() {
  return (
    <AuthProvider>
      {/* <RouterProvider router = {router} /> */}
      <Router>
        <Routes>
          <Route path='login' element = {<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='/about' element = {<About />} />
          <Route element = {<PrivateRoute />}>
            <Route path='/dashboard' element = {<Dashboard />} />
          </Route>
          <Route path='/admin' element = {<Admin />} />
          {/* <PrivateRoute path="/dashboard" element ={<Dashboard />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
    
  );
}

export default App;
