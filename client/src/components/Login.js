import React, { useState } from 'react';
import { useAuth } from '../AuthProvider'
// import { useNavigate } from 'react-router-dom';
export default function Home() {

    const [users, setUsers] = useState({
        name: '',
        password: '',
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
    function handleSubmit(e) {
        e.preventDefault();
        if (users.username !== "" && users.password !== "") {
            auth.loginAction(users);
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
                <button>Submit</button>
            </form>
            <h1>context is {auth.user}</h1>
            {/* {console.log("username from auth is" ,auth.user)} */}
        </div>
    )
}