

export const initialState = {
    status: 'checking',
    uid: null,
    email: null,
    displayName: null, 
    photoURL: null, 
    errorMessage: null|undefined,
};

export const authenticatedState = {
    status: 'authenticated', 
    uid: '123ASD',
    email: 'google@hotmail.com',
    displayName: 'mateo', 
    photoURL: 'https://photoUrl.jpg', 
    errorMessage: null,
};

export const notAuthenticatedState = {
    status: 'not-authenticated', 
    uid: null,
    email: null,
    displayName: null, 
    photoURL: null, 
    errorMessage: null,
};

export const demoUser = {
    uid: '123ASD',
    email: 'mateo@hotmail.com',
    displayName: 'mateo',
    photoURL: 'https://photoUrl.jpg'
};





