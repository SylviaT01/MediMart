import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

// Fetch function to handle token expiration
const fetchWithAuth = async (url, options = {}) => {
    let token = localStorage.getItem('token');
    options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`
    };

    let response = await fetch(url, options);

    if (response.status === 401) {
        const refreshToken = localStorage.getItem('refresh_token');
        const refreshResponse = await fetch('http://127.0.0.1:5000/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refreshToken}`
            }
        });

        if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();
            localStorage.setItem('token', refreshData.access_token);

            options.headers['Authorization'] = `Bearer ${refreshData.access_token}`;
            response = await fetch(url, options);
        } else {
            // Handle refresh token failure (e.g., redirect to login)
            localStorage.removeItem('token');
            localStorage.removeItem('refresh_token');
        }
    }

    return response;
};

export const UserProvider = ({ children }) => {
    const nav = useNavigate();
    const [authToken, setAuthToken] = useState(() => localStorage.getItem('token') ? localStorage.getItem('token') : null);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true); // New state for loading

    // Fetch current user details if authToken exists
    const fetchCurrentUser = async () => {
        if (authToken) {
            try {
                const response = await fetchWithAuth('http://127.0.0.1:5000/current_user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setCurrentUser(data);
                } else {
                    console.error('Failed to fetch current user:', data.message);
                }
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        }
        setLoading(false); // Set loading to false after attempting to fetch the current user
    };

    // Initialize by fetching current user if token exists
    useEffect(() => {
        fetchCurrentUser();
    }, [authToken]);

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
                localStorage.setItem('refresh_token', res.refresh_token); // Store refresh token
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
        fetchWithAuth('http://127.0.0.1:5000/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if (res.success) {
                setAuthToken(null);
                setCurrentUser(null);
                localStorage.removeItem('token');
                localStorage.removeItem('refresh_token');
                nav('/login');
            } else {
                alert("Something went wrong");
            }
        });
    };

    const contextData = {
        currentUser,
        signup,
        login,
        logout,
        authToken,
        loading 
    };

    return (
        <UserContext.Provider value={contextData}>
            {children}
        </UserContext.Provider>
    );
};
