import React, { useState, useEffect, createContext } from "react";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
console.log(apiEndpoint);

  useEffect(() => {
    fetch(`${apiEndpoint}/profile`, {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((userInfo) => {
        setUserInfo(userInfo);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, [apiEndpoint]);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
