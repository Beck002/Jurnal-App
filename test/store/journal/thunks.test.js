import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/firebaseConfig";
import { addNewEmptyNote, deleteNoteById, journalSlice, savingNewNote, setActiveNote, setNotes } from "../../../src/store/journal/journalSlice";
import { startDeletingNote, startLoadingNotes, startNewNote, startSavingNote } from "../../../src/store/journal/thunks";

import { loadNotes } from "../../../src/helpers/loadNotes"; 
import { updatedNoteState } from "../../fixtures/journalFixtures";


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

        // Borrar de Firebase 

        const collectionRef  = collection( FirebaseDB, `${uid}/journal/notes`);
        const docs = await getDocs( collectionRef );

        const deletePromises = [];
        docs.forEach( doc => delete deletePromises.push( deleteDoc( doc.ref )));
        
        await Promise.all( deletePromises )


    });

    test('startLoadingNotes debe cargar las notas correctamente', async () => {  

        const uid = 'Test-uid'
        getState.mockReturnValue({ auth: { uid: uid }});

        await startNewNote()( dispatch , getState );
        await startLoadingNotes()( dispatch, getState );

        const notes = await loadNotes(uid);
        expect( dispatch ).toHaveBeenCalledWith( setNotes( notes ));

        // // Borrar de Firebase 

        const collectionRef  = collection( FirebaseDB, `${uid}/journal/notes`);
        const docs = await getDocs( collectionRef );

        const deletePromises = [];
        docs.forEach( doc => delete deletePromises.push( deleteDoc( doc.ref )));
        
        await Promise.all( deletePromises )
    })

    test('startSavingNote: debe guardar la nota correctamente', async () => {  

        
        const uid = 'Test-uid';
        
        getState.mockReturnValue({ auth: { uid }, journal: { active: active }})
        
        await startNewNote()( dispatch, getState);
        const notes  = await loadNotes(uid);
        const active = {...notes[0], body: 'testing', title: "testing title"}
        getState.mockReturnValue({ auth: { uid }, journal: { active: active }})

        await startSavingNote()( dispatch, getState)

        expect( dispatch ).toHaveBeenCalledWith(setActiveNote({
            title: expect.any( String ),
            body: expect.any( String ),
            id: expect.any( String ),
            date: expect.any( Number )
        }))

        // Borrar de Firebase 
        const collectionRef  = collection( FirebaseDB, `${uid}/journal/notes`);
        const docs = await getDocs( collectionRef );

        const deletePromises = [];
        docs.forEach( doc => delete deletePromises.push( deleteDoc( doc.ref )));
        
        await Promise.all( deletePromises )
    })

    test('startDeletingNote: debe borrar de forma correcta', async () => {  

        
        const uid = 'Test-uid';
        getState.mockReturnValue({ auth: { uid }})
        await startNewNote()( dispatch, getState);
        const notes  = await loadNotes(uid);
        const active = {...notes[0], body: 'testing', title: "testing title"}
        
        getState.mockReturnValue({ auth: { uid }, journal: { active: active }})

        await startDeletingNote()( dispatch, getState )
        expect( dispatch ).toHaveBeenCalledWith( deleteNoteById(active.id));


    });

})