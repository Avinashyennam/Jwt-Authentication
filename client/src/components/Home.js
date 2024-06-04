import { useState, useEffect } from "react"
export default function Home()
{

    const [user, setUser] = useState([]);

    useEffect(()=>{
        fetch("/data")
        // fetch("/:user/data")
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{
            //[...user]
            setUser(data);
            console.log(user);
        })
    },[user]);
    return(
        <div>
            <h1>Home Page</h1>
            <ul>
                {
                    user.map((item)=>(
                        <li key = {item.id}>
                            <p>{item.name}</p>
                            <p>{item.password}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
        
    )
}