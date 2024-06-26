import { useContext, createContext, useState, useEffect } from "react";
const AuthContext = createContext({
    user: "",
    // setUser: ()=>{},
    token: "",
    // setToken: ()=>{},
    loginAction: () => { },
    logout: () => { }
});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const loginAction = async (data) => {
        try {
            await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    console.log("user data is ", data.user);
                    setUser(data.user.username);
                    setToken(data.token);
                    localStorage.setItem("site", data.token);
                    window.location.href = "/dashboard";
                    return;
                })
                .catch((err) => {
                    console.log("fetch errors: ", err);
                })
        }
        catch (err) {
            console.log(err);
        }
    };

    const admin = async (data) => {
        try {
            await fetch("/admin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    console.log("user data is ", data.user);
                    setIsAdmin((prev)=> !prev);
                    console.log(isAdmin);
                    setUser(data.user.username);
                    setToken(data.token);
                    localStorage.setItem("site", data.token);
                    // window.location.href = "/dashboard";
                    return;
                })
                .catch((err) => {
                    console.log("fetch errors: ", err);
                })
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        console.log("user state@2 is ", user);
    }, [user]);
    useEffect(()=>{
        console.log(isAdmin);
    },[isAdmin]);
    const logout = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("site");
    }
    return <AuthContext.Provider
        value={{ token, user, loginAction, logout, admin, isAdmin }}
    >
        {children}
    </AuthContext.Provider>
}

export default AuthProvider
export const useAuth = () => {
    return useContext(AuthContext);
};
// --- once try this ---
// export {AuthContext, AuthProvider};