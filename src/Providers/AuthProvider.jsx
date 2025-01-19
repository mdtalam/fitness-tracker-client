import axios from "axios";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";


export const AuthContext = createContext(null)
const auth = getAuth(app);
const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true);
    const provider = new GoogleAuthProvider();

    // create User
    const createUser = (email,password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    // signin
    const signin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // signOut
    const logOut = () =>{
        setLoading(true);
        return signOut(auth)
    }

    // update profile
    const updateUserProfile = (name,photo) => {
        return updateProfile(auth.currentUser,{
            displayName: name, photoURL:photo
        })
    }

    // google sign in
    const googleSignin = () =>{
        return signInWithPopup(auth,provider)
    }


    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, async currentUser =>{
            if(currentUser?.email){
                setUser(currentUser);
                // save user info
                await axios.post(`${import.meta.env.VITE_API_URL}/users/${currentUser?.email}`,{
                    name: currentUser?.displayName,
                    image: currentUser?.photoURL,
                    email: currentUser?.email,
                })
            }else{
                setUser(currentUser)
            }
            console.log('current User', currentUser)
            setLoading(false);
        })
        return () => {
            return unsubscribe();
        }
    },[])

    const authInfo = {
        user,
        setUser,
        loading,
        createUser,
        signin,
        updateUserProfile,
        googleSignin,
        logOut,



    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;