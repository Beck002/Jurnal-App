
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // ckecking - authenticated
        uid: null,
        name: null, 
        email: null,
        displayName: null, 
        photoURL: null, 
        errorMessage: null,
    },
    reducers: {
        login: ( state, { payload } ) =>{
            state.status       = 'authenticated'; // ckecking - authenticated
            state.uid          = payload.uid;
            state.name         = payload.name; 
            state.email        = payload.email; 
            state.displayName  = payload.displayName; 
            state.photoURL     = payload.photoURL; 
            state.errorMessage = null;
        },
        logout: ( state, { payload } ) =>{
            state.status       = 'not-authenticated'; // ckecking - authenticated
            state.uid          = null;
            state.email        = null;
            state.name         = null; 
            state.displayName  = null; 
            state.photoURL     = null; 
            state.errorMessage = payload?.errorMessage ;
            
        },
        checkingCredentials: ( state )=>{
            state.status = 'checking'
        }

    }
});
export const { login, logout, checkingCredentials } = authSlice.actions;


