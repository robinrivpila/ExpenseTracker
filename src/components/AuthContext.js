import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser);
        });

        return () => unsubscribe();
    },[]);

    const logout = async () => {
        try{
            await signOut(auth);
            <p>You have successfully logged out!</p>
        }catch(error){
            console.error("Logout Error: ", error); 
        }
    }

    return(
        <AuthContext.Provider value={{user, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext); 