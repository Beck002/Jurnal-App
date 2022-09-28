import { loginWithEmailPassword, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/provider"
import { checkingCredentials, login, logout } from "./authSlice"




export const checkingAuthentication = ( email, password )=>{

    return async ( dispatch )=>{

        dispatch( checkingCredentials() )    
            
    }   


}

export const startGoogleSingIn = ( email, password ) =>{

    return async ( dispatch )=>{

        dispatch( checkingCredentials() );
        
        const result  = await signInWithGoogle();
        
        if( !result.ok ) return dispatch( logout( result.errorMessage ))
        
        dispatch( login( result ))
       

    }   


}


export const startCreatingUserWithEmailPassword = ({ email, password, displayName })=> {

    return async ( dispatch )=>{
        
        dispatch( checkingCredentials() );

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });

        if( !ok ) return dispatch( logout({errorMessage}));

        dispatch( login({ uid, displayName, email, photoURL }));
        



    }

} 


export const startLoginWithEmailPassword = ({ email, password })=> {


    return async ( dispatch )=>{

        dispatch( checkingCredentials() );

        const { uid, photoURL, displayName, ok, errorMessage} = await loginWithEmailPassword({ email, password });

            
        if(!ok) return dispatch( logout({ errorMessage }));

        dispatch( login({ uid, displayName, email, photoURL }))

    }   



}









