import React, { useEffect, useState } from "react";

// firebase imports
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { authentication } from "../../firebase";

export function useAuth() {
  const [user, setUser] = useState();
  useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });

    return unsubscribe;
  }, []);

  return user;
}
