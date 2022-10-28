

export const initialState = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null,
}

export const savingNoteState = {
    isSaving: true,
}


export const newEmptyNoteState = 
{
    isSaving: false,
    messageSaved: '',
    notes: [{
        id: '123ASD',
        title: '',
        body: '',
        date: 123123,
        imageUrls: [],
    }],
    active: null,
} 

export const setActiveNoteState = {
    isSaving: false,
    messageSaved: '',
    notes: [{
        id: '123ASD',
        title: '',
        body: '',
        date: 123123,
        imageUrls: [],
    }],
    active: {
        id: '123ASD',
        title: '',
        body: '',
        date: 123123,
        imageUrls: [],
    }
}

export const updatedNoteState = {
    isSaving: false,
    messageSaved: '',
    notes: [{
        id: '123ASD',
        title: 'updateState test',
        body: 'updateState test',
        date: 123123,
        imageUrls: [],
    } ],
    active: {
        id: '123ASD',
        title: 'updateState test',
        body: 'updateState test',
        date: 123123,
        imageUrls: [],
    } 
}

export const setPhotosToActiveNoteState = [
    'https://www.fotos.com',
    'https://www.fotos2.com',
    'https://www.fotos3.com',
    'https://www.fotos4.com'
]
    
