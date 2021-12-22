import { Spin } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../Firebase/config";

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const history = useHistory();
  React.useEffect(() => {
    const unsubscibed = auth.onAuthStateChanged((user) => {
     
      if (user) {
        // console.log(user);
        const { displayName, email, uid, photoURL } = user;
        setUser({
          displayName,
          email,
          uid,
          photoURL,
        });
        setIsLoading(false);
        history.push('/');       
        return;
      }
      setIsLoading(false);
      history.push('/login');  
    });
    // clean fc
    return () =>{
      unsubscibed();
    }
  }, [history]);

  return (
    <AuthContext.Provider value={{ user }}>
      {isLoading ? <Spin/> : children}
      {/* {children} */}
    </AuthContext.Provider>
  );
}
