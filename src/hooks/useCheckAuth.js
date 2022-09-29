import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/firebaseConfig";
import { login, logout } from "../store/auth/authSlice";

export const useCheckAuth = () => {

    const { status } = useSelector( state => state.auth);
    const  dispatch  = useDispatch();
  
    useEffect(() => {
      
      onAuthStateChanged( FirebaseAuth, async ( user )=>{
        
        if( !user ) return dispatch( logout());
  
        const { displayName, uid, email, photoURL } = user;
  
        dispatch( login({ displayName, uid, email, photoURL }));

      })
  
    }, [])

    return {
        status
    }

}
