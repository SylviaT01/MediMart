import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const nav = useNavigate();
    const [authToken, setAuthToken] = useState(() => localStorage.getItem('token') ? localStorage.getItem('token') : null);
    const [currentUser, setCurrentUser] = useState(null);

    console.log('====================================');
    console.log(authToken);
    console.log('====================================');

    // Register User
    const signup = (name, email, password) => {
        fetch('http://127.0.0.1:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password 
            })
        })
        .then(res => res.json())
        .then(res => {
            console.log('Signup response:', res);
            if (res.success) {
                nav('/login');
                alert(res.success);
            } else if (res.error) {
                alert(res.error);
            } else {
                alert("Something went wrong");
            }
        })
        .catch(error => {
            console.error('Error during signup:', error);
            alert("Something went wrong");
        });
    };

    // Login User
    const login = (email, password) => {
        fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password 
            })
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if (res.access_token) {
                setAuthToken(res.access_token);
                localStorage.setItem('token', res.access_token);
                nav('/home');
                alert("Login success");
            } else if (res.error) {
                alert(res.error);
            } else {
                alert("Invalid password or username");
            }
        });
    };

    // Logout User
    const logout = () => {
        fetch('http://127.0.0.1:5000/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }}
        )
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if (res.success) {
                setAuthToken(null);
                localStorage.removeItem('token');
                nav('/login');
            } else {
                alert("Something went wrong");
            }
        });
    };

    useEffect(() => {
        if (authToken) {
            fetch('http://127.0.0.1:5000/current_user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${authToken}`
                }
            })
            .then(res => res.json())
            .then(res => {
                setCurrentUser(res);
            });
        } else {
            setCurrentUser(null);
        }
    }, [authToken]);

    const contextData = {
        currentUser,
        signup,
        login,
        logout,
        authToken
    };

    return (
        <UserContext.Provider value={contextData}>
            {children}
        </UserContext.Provider >
    );
};
