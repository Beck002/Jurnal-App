const { journalSlice, addNewEmptyNote, savingNewNote, setActiveNote, setSaving, updateNote, setPhotosToActiveNote, deleteNoteById, clearNotesLogout } = require("../../../src/store/journal/journalSlice")
const { initialState, newEmptyNoteState, setSavingState, updatedNoteState, setPhotosToActiveNoteState } = require("../../fixtures/journalFixtures")

describe('JournalSlice test', ()=> {

    test('debe regresar el estado inicial y llamarse journal', () => { 

        const state = journalSlice.reducer( initialState, { });
        expect( journalSlice.name ).toBe('journal');
        expect( state ).toEqual( initialState );
    })



    test('savingNote debe regresar el isSaving en true', () => { 

        const state = journalSlice.reducer( initialState, savingNewNote( initialState, {} ));
        expect( state.isSaving ).toBe( true );

    })

    test('addNewEmptyNote: debe añadir una nueva nota', () => {  

        const state = journalSlice.reducer( initialState, addNewEmptyNote( newEmptyNoteState ));

        expect( state.notes[0] ).toEqual({
            isSaving: false,
            messageSaved: '',
            notes: [
              { id: '123ASD', title: '', body: '', date: 123123, imageUrls: [] }
            ],
            active: null
        })

    })

    test('setActiveNote: debe existir una nota y mostrar la nota activa', () => { 

        const state = journalSlice.reducer( newEmptyNoteState, setActiveNote(newEmptyNoteState.notes[0]));

        expect( state ).toEqual({
            isSaving: false,
            messageSaved: '',
            notes: [
              { id: '123ASD', title: '', body: '', date: 123123, imageUrls: [] }
            ],
            active: { id: '123ASD', title: '', body: '', date: 123123, imageUrls: [] }
        })
        

    })

    test('setSavingNote: debe retornar isSaving en true y messageSaved = "" ', () => {
        
        const state = journalSlice.reducer( initialState, setSaving())
        expect(state).toEqual({
            isSaving: true,
            messageSaved: '',
            notes: [],
            active: null
        });

    })

    test('updateNote: debe actualizar una nota correctamente', () => {  

        const state = journalSlice.reducer( newEmptyNoteState, updateNote(updatedNoteState.notes[0]))

        expect( state ).toEqual({
            isSaving: false,
            messageSaved: 'updateState test, actualizada correctamente',
            notes: [
              {
                id: '123ASD',
                title: 'updateState test',
                body: 'updateState test',
                date: 123123,
                imageUrls: []
              }
            ],
            active: null
        })
    })

    test('setPhotosToActiveNote: debe cargar las fotos correctamente ', () => {


        const state = journalSlice.reducer( updatedNoteState, setPhotosToActiveNote(setPhotosToActiveNoteState) )

        expect( state ).toEqual({
            isSaving: false,
            messageSaved: '',
            notes: [
              {
                id: '123ASD',
                title: 'updateState test',
                body: 'updateState test',
                date: 123123,
                imageUrls: []
              }
            ],
            active: {
              id: '123ASD',
              title: 'updateState test',
              body: 'updateState test',
              date: 123123,
              imageUrls: [
                'https://www.fotos.com',
                'https://www.fotos2.com',
                'https://www.fotos3.com',
                'https://www.fotos4.com'
              ]
            }
        })
    })

    test('deleteNoteById: debe borrar correctamente', () => { 

        const state = journalSlice.reducer( updatedNoteState, deleteNoteById(updatedNoteState.notes[0].id));

        expect( state ).toEqual({ isSaving: false, messageSaved: '', notes: [], active: null });
    })

    test('clearNotesLogout: debe regresar al estado inicial', () => {

        const state = journalSlice.reducer( updatedNoteState, clearNotesLogout());

        console.log(state)
        expect( state ).toEqual({ 
            isSaving: false,
            messageSaved: '',
            notes: [],
            active: null 
        })

    })
})