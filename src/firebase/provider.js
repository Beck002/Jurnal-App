import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuth } from "./firebaseConfig";


const googleProvider = new GoogleAuthProvider();


export const signInWithGoogle = async ()=>{

    try {

        const result = await signInWithPopup( FirebaseAuth, googleProvider ); 

        const { displayName, uid, email, photoURL} = result.user; 

        return {
            ok: true,
            // User Info
            displayName, uid, photoURL, email
        }


    } catch (error) {

        const errorCode = error.code;
        const errorMessage = error.message;

        return{
            ok: false, 
            errorMessage
        }
    }


}

export const registerUserWithEmailPassword = async ({ email, password, displayName })=>{

    try {

        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password)
        const { uid, photoURL } = resp.user;

        await updateProfile( FirebaseAuth.currentUser, { displayName });
 
        // Todo : actualizar displayName en Firebase

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {
        
        return{ ok: false, errorMessage: error.message }

    }


}

export const loginWithEmailPassword = async ({ email, password })=>{


    try {
        
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL, displayName } = resp.user;

        return{
            ok: true, 
            uid, photoURL, displayName
        }

    } catch (error) {
        return{ ok: false , errorMessage: error.message }
    }



}