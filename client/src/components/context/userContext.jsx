import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

// Fetch function to handle token expiration
const fetchWithAuth = async (url, options = {}) => {
  let token = localStorage.getItem("token");
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  let response = await fetch(url, options);

  if (response.status === 401) {
    const refreshToken = localStorage.getItem("refresh_token");
    const refreshResponse = await fetch("http://127.0.0.1:5000/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (refreshResponse.ok) {
      const refreshData = await refreshResponse.json();
      localStorage.setItem("token", refreshData.access_token);

      options.headers["Authorization"] = `Bearer ${refreshData.access_token}`;
      response = await fetch(url, options);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
    }
  }

  return response;
};

export const UserProvider = ({ children }) => {
  const nav = useNavigate();
  const [authToken, setAuthToken] = useState(
    () => localStorage.getItem("token") || null
  );
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = async () => {
    if (authToken) {
      try {
        const response = await fetchWithAuth(
          "http://127.0.0.1:5000/current_user",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setCurrentUser(data);
        } else {
          console.error("Failed to fetch current user:", data.message);
          handleLogout();
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
        handleLogout();
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCurrentUser();
  }, [authToken]);

  const signup = (name, email, password) => {
    fetch("http://127.0.0.1:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          nav("/login");
          alert(res.success);
        } else if (res.error) {
          alert(res.error);
        } else {
          alert("Something went wrong");
        }
      })
      .catch((error) => {
        console.error("Error during signup:", error);
        alert("Something went wrong");
      });
  };

  const login = (email, password) => {
    fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.access_token) {
          setAuthToken(res.access_token);
          localStorage.setItem("token", res.access_token);
          localStorage.setItem("refresh_token", res.refresh_token);
          nav("/home");
          alert("Login success");
        } else if (res.error) {
          alert(res.error);
        } else {
          alert("Invalid password or username");
        }
      });
  };

  const handleLogout = () => {
    setAuthToken(null);
    setCurrentUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    nav("/login");
  };

  const logout = () => {
    fetchWithAuth("http://127.0.0.1:5000/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          handleLogout();
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
    loading,
  };

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
};
