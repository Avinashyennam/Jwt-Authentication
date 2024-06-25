import React, { useState } from 'react';
import { useAuth } from '../AuthProvider'
// import { useNavigate } from 'react-router-dom';
export default function Home() {

    const [users, setUsers] = useState({
        name: '',
        password: '',
        category: ''
    })
    
    // const navigate = useNavigate();
    const auth = useAuth();
    function handleChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        setUsers({
            ...users,
            [name]: value,
        });
        console.log(users);
    };

    // function handleRadio(e){
        
    // }
    function handleSubmit(e) {
        e.preventDefault();
        if (users.username !== "" && users.password !== "") {
            if(users.category === 'admin'){
                auth.admin(users);
            }else{
                auth.loginAction(users);
            }
            
            // return;
        }
        else{
            alert("please provide a valid input");
        }
        
    }
    const center = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100
    }
    const flexcol = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    }
    const formStyles = {
        padding: 15,
        border: "1px solid black",
    }
    return (
        <div style={center}>
            {/* {if(users.category === 'admin')?onSubmit={}:onSubmit={}} */}
            <form onSubmit={handleSubmit} style={formStyles}>
                <div style={flexcol}>
                    <label
                        htmlFor="email"
                    >Enter Email</label>
                    <input
                        type="email"
                        value={users.name}
                        id="email" name="name"
                        onChange={handleChange}
                    />
                </div>
                <div style={flexcol}>
                    <label
                        htmlFor="pwd"
                    >Enter password</label>
                    <input
                        type="password"
                        value={users.password}
                        id="pwd"
                        name="password"
                        onChange={handleChange}
                    />
                </div>
                <div style={flexcol}>
                    <label
                    >Admin</label>
                    <input
                        type="radio"
                        value="admin"
                        name="category"
                        checked = {users.category === "admin"}
                        onChange={handleChange}
                    />
                </div>
                <div style={flexcol}>
                    <label
                    >User</label>
                    <input
                        type="radio"
                        value="user"
                        name="category"
                        checked = {users.category === "user"}
                        onChange={handleChange}
                    />
                </div>
                <button>Submit</button>
            </form>
            <h1>context is {auth.user}</h1>
            {(auth.isAdmin === true)?<h1>Admin logged in</h1>:<h1>User logged in</h1>}
        </div>
    )
}