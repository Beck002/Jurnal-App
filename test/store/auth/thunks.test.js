import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../../src/firebase/provider"
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startCreatingUserWithEmailPassword, startGoogleSingIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks"
import { clearNotesLogout } from "../../../src/store/journal";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../src/firebase/provider');

describe('testing auth thunks', ()=>{
    
    const dispatch = jest.fn();
    beforeEach( () => jest.clearAllMocks() );

    test('debe invocar el checkingCredentials', async () => { 

        // checkingAuthentication()
        await checkingAuthentication()( dispatch )
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );

    });

    test('startGoogleSingIn debe llamar checking credentials y login', async() => {  

        const loginData = { ok: true,...demoUser };
        await signInWithGoogle.mockResolvedValue( loginData )
        // thunk 
        await startGoogleSingIn()(dispatch);
        expect( dispatch ).toHaveBeenCalledWith(checkingCredentials())
        expect( dispatch ).toHaveBeenCalledWith(login( loginData ))

    });

    test('startGoogleSingIn debe llamar checking credentials y logout con un mensaje de error', async() => {  

        const loginData = { ok: false, errorMessage: 'error en google' }
        await signInWithGoogle.mockResolvedValue( loginData )
        // thunk 
        await startGoogleSingIn()(dispatch);
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ))

    });

    test('startCreatingUserWithEmailPassword: debe llamar al checking credentials y login', async () => { 

        const loginData = { ok: true, password: '123456', ...demoUser }; 
        await registerUserWithEmailPassword.mockResolvedValue( loginData );
        // thunk
        await startCreatingUserWithEmailPassword( loginData )(dispatch);
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( demoUser ) );

    });

    test('startLoginWithEmailPassword: debe llamara checkingCredentials y login', async() => { 

        const loginData = { ok: true, ...demoUser };
        const formData  = { email: demoUser.email, password: '123456'};
        await loginWithEmailPassword.mockResolvedValue( loginData );
        //thunks
        await startLoginWithEmailPassword( formData )( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( demoUser ) );

    });

    test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async() => {  

        //thunks
        await startLogout()( dispatch );
        expect( logoutFirebase ).toHaveBeenCalled;        
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout() );

    })


})