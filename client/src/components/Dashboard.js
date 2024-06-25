import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
// import Admin from './Admin';
import { useAuth } from "../AuthProvider";
const {isAdmin} = useAuth;
console.log(isAdmin);
const Dashboard = () => {
  const auth = useAuth();
  const [name, setName] = useState(auth.user);
  const [pass, setPass] = useState(auth.token);
  console.log(auth.isAdmin);
  // const {user} = auth.user;
  // const {token} = auth.token;
  console.log("User in dashboard is ", auth.user);

  useEffect(() => {
    setName(auth.user);
    setPass(auth.token);
  }, [auth]);

  return (
    <div className="container">
      <div>
        <h1>Welcome!</h1>
        <p>{auth.user}</p>
        <p>{auth.token}</p>
        <p>{name}</p>
        {console.log(auth.user)}
        <p>{pass}</p>
        <button onClick={() => auth.logout()} className="btn-submit">
          logout
        </button>
        {
          (auth.isAdmin === true)?<Link to='/admin'><button>Admin</button></Link>:<><h1>You are a user</h1></>
        }
      </div>
    </div>
  );
};
export default Dashboard;