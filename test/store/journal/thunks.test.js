import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/firebaseConfig";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";

describe('Tesnting thunks journal', () => {
    

    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach( () => { jest.clearAllMocks() });

    test('startNewNote debe crear una nueva nota en blanco', async() => {  
         

        const uid = 'Test-uid'

        getState.mockReturnValue({ auth: { uid: uid }})
        await startNewNote()( dispatch , getState );
        
        expect( dispatch ).toHaveBeenCalledWith( savingNewNote() )
        expect( dispatch ).toHaveBeenCalledWith( addNewEmptyNote({
            title: '',
            body: '',
            id: expect.any( String ),
            date: expect.any( Number )
        }));

        expect( dispatch ).toHaveBeenCalledWith( savingNewNote() )
        expect( dispatch ).toHaveBeenCalledWith( setActiveNote({
            title: '',
            body: '',
            id: expect.any( String ),
            date: expect.any( Number )
        }));

        // Borrar de Firebase 

        const collectionRef  = collection( FirebaseDB, `${uid}/journal/notes`);
        const docs = await getDocs( collectionRef );

        const deletePromises = [];
        docs.forEach( doc => delete deletePromises.push( deleteDoc( doc.ref )));
        
        await Promise.all( deletePromises )


    });




})