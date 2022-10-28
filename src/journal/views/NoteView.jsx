import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveNote } from '../../store/journal/journalSlice';
import { startDeletingNote, startSavingNote, startUploadingFiles } from '../../store/journal';

import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { useForm } from '../../hooks/useForm';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css'

import { ImageGallery } from '../components'
import { useRef } from 'react';


export const NoteView = () => {

    const dispatch = useDispatch();

    const { active:note, isSaving, messageSaved   } = useSelector( state => state.journal)
    const { body, title, date, onInputChange, formState} = useForm(note)
    
    useEffect(() => {
        dispatch( setActiveNote(formState));
    }, [formState])

    useEffect(() => {
        if( messageSaved.length > 0 ){
            
            Swal.fire('Nota Actualizada', messageSaved, 'success')
        }
    }, [messageSaved])
    
    
    const dateString = useMemo(() => {
        const newDate = new Date( date );
        return newDate.toUTCString();
    }, [ date ])


    const fileInputRef = useRef();

    const onSaveNote = ()=>{
        dispatch( startSavingNote(formState))
    }

    const onFileInputChange = ({ target })=>{
        if( target.files === 0 ) return;
        
        dispatch( startUploadingFiles( target.files ));
    }

    const onDeleteNote = ()=>{
        dispatch( startDeletingNote() );
    }

    return (
        <Grid 
            className='animate__animated animate__fadeIn animate__faster'
            container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}
        >
            <Grid item>
                <Typography fontSize={ 39 } fontWeight='light' >{ dateString }</Typography>
            </Grid>
            <Grid item>

                <input
                    ref={ fileInputRef }
                    type="file"
                    multiple
                    onChange={ onFileInputChange }
                    style={{ display: 'none' }}
                />
                <IconButton
                    onClick={ ()=> fileInputRef.current.click()}
                    color="primary"
                    disabled={ isSaving }
                >
                    <UploadOutlined/>
                </IconButton>
                <Button 
                    disabled={ isSaving }
                    onClick={ onSaveNote }
                    color="primary" 
                    sx={{ padding: 2 }}
                    >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un título"
                    label="Título"
                    sx={{ border: 'none', mb: 1 }}
                    name="title" 
                    value={ title }
                    onChange={ onInputChange }
                />

                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Qué sucedió en el día de hoy?"
                    minRows={ 5 }
                    name="body"
                    value={ body }
                    onChange={ onInputChange }

                />
            </Grid>
            <Grid 
                container
                justifyContent="end"
            >   
                <Button
                    onClick={ onDeleteNote }
                    sx={{ mt: 2}}
                    color="error"
                >
                    BORRAR
                    <DeleteOutline/>
                </Button>
            </Grid>
            {/* Image gallery */}

            {
                (note.imageUrls )
                ? <ImageGallery  images={ note.imageUrls}/>
                : null
            }

        </Grid>
    )
}
