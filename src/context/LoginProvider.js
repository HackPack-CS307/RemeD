import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState("");
  const [uid, setUid] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [drug, setDrug] = useState("");
  const [pharmacyAvailableDrugs, setPharmacyAvailableDrugs] = useState("");

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userEmail,
        setUserEmail,
        uid,
        setUid,
        drug,
        setDrug,
        pharmacyAvailableDrugs,
        setPharmacyAvailableDrugs,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useLogin = () => useContext(UserContext);

export default UserProvider;

// import React, { createContext, useState } from "react";

// const UserContext = createContext();

// export default UserContext;
