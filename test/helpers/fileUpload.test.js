const { fileUpload } = require("../../src/helpers/fileUpload");
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
    cloud_name: 'db2byonvh', 
    api_key: '687255297361952',
    api_secret: '_tMXp58MjbbFnejnF7eZP5zSXw8',
    secure: true,
});

describe('Pruebas en fileUpload', ()=>{

    test('debe subir el archivo correctamente a cloudinary', async() => { 

        const imageUrl = 'https://images.unsplash.com/photo-1627215750463-3386c8ed92ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80';
        const resp = await fetch( imageUrl );

        const blob = await resp.blob();   
        const file = new File([blob], 'foto.jpg');
        const url  = await fileUpload( file );
        
        expect( typeof url ).toBe('string');

        
        const segments = url.split('/');
        const imageId  = segments[ segments.length - 1].replace('.jpg', '');
        const cloudResp = await cloudinary.api.delete_resources([ 'journal-app/' + imageId ],{
            resource_type: 'image'
        })
            
    })

    test('debe retornar null', async() => { 

        const file = new File([], 'foto jpg');
        const url  = await fileUpload( file );
        expect( url ).toBe(null);

    })

}) 






