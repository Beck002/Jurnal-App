import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures";



describe('Testing estados de AuthSlice Redux ', ( ) =>{


    test('debe regresar el estado inicial y llamarse auth', ( ) => {
        
        const state = authSlice.reducer( initialState, { } );
        
        expect( authSlice.name ).toBe( 'auth' );
        expect( state ).toEqual( initialState );

    });

    test(' debe realizar la autenticacion', ( ) => {

        const state = authSlice.reducer( authenticatedState, login( demoUser ));

        expect( state ).toEqual({
            status: 'authenticated', 
            uid: demoUser.uid, 
            email: demoUser.email, 
            displayName: demoUser.displayName, 
            photoURL: demoUser.photoURL, 
            errorMessage: null,
        });

    });

    test('debe de realizar el logout sin argumentos', ( ) => {  

        const state = authSlice.reducer( initialState, logout() );
        expect( state ).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        });


    });

    test('debe de realizar el logout y mostrar un error', () => {  

        const errorMessage = 'error en consola'; 
        const state = authSlice.reducer( initialState, logout({errorMessage}))
        notAuthenticatedState.errorMessage = errorMessage;
        expect( state ).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: 'error en consola'
        });

    });

    test('debe cambiar el estado a checking', () => { 

        const state = authSlice.reducer( initialState, checkingCredentials());
        expect( state.status ).toBe('checking');

    });



})











