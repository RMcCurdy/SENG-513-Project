import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Help from '@mui/icons-material/HelpOutline';
import MenuItem from '@mui/material/MenuItem';
import { useHistory } from 'react-router-dom';
import { storage, db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';

const NewPost = () => {
    // History variable is used to update the path of the site
    const history = useHistory();

    const { currentUser } = useAuth();

    const [imageUpload, setImageUpload] = useState('');
    const [imagePreview, setImagePreview] = useState('');

    const [values, setValues] = React.useState({
        description: '',
        workoutType: '',
        reps: '',
        sets: '',
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    let validPost = imageUpload !== '' && values.description !== '' && values.workoutType !== '' && values.reps !== '' && values.sets !== '' ? true : false;

    const handleChangeImage = () => {
        setImageUpload('');
    };

    const handleUploadedFiles = (e) => {
        if (e.target.files[0]) {
            setImagePreview(URL.createObjectURL(e.target.files[0]));
            setImageUpload(e.target.files[0]);
        }
    };

    const handlePostClick = () => {
        const uploadTask = storage.ref(`images/${imageUpload.name}`).put(imageUpload);
        uploadTask.on(
            'state_changed',
            (snapshot) => { },
            (error) => {
                console.log(error);
            },
            () => {
                storage
                    .ref('images')
                    .child(imageUpload.name)
                    .getDownloadURL()
                    .then((url) => {
                        console.log(url);
                    });
            },
        );
        // POST values to firestore
        db
            .collection('posts')
            .doc()
            .set({
                username: currentUser.displayName,
                description: values.description,
                reps: values.reps,
                sets: values.sets,
                workoutType: values.workoutType,
                imgName: imageUpload.name,
                postComments: [],
                postLikes: [],
                time: Date()
            });

        history.push('/user/home');
    };

    return (
        <div className='workout-container'>
            <div className='card-container'>
                <div style={{ marginBottom: '0.5rem', color: 'var(--button-blue)' }} className='workout-header'>
                    New Post
                </div>
                <div className='workout-helper-text'>Fill in the following fields to generate a post</div>

                <div className='post-content-container'>
                    {imagePreview !== '' ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img className='new-post-image-preview' src={imagePreview} alt='imageUpload' />
                            <Button
                                onClick={handleChangeImage}
                                style={{
                                    textTransform: 'none',
                                    borderRadius: '500px',
                                    padding: '0.5rem 1rem',
                                    backgroundColor: 'red',
                                    color: 'whitesmoke',
                                    fontFamily: 'Spartan-B',
                                    fontSize: '1rem',
                                    marginTop: '0.5rem',
                                }}
                                variant='contained'>
                                Change Image
                            </Button>
                        </div>
                    ) : (
                        <div className='new-post-upload-container'>
                            <h3 style={{ marginTop: '0' }}>Upload image</h3>
                            <Button
                                variant='contained'
                                component='label'
                                style={{
                                    textTransform: 'none',
                                    borderRadius: '500px',
                                    padding: '0.5rem 1rem',
                                    backgroundColor: '#0077b6',
                                    color: 'whitesmoke',
                                    fontFamily: 'Spartan-B',
                                    fontSize: '1rem',
                                    marginTop: '0.5rem',
                                }}>
                                Choose files
                                <input type='file' name='files' accept='image/png, image/gif, image/jpeg' hidden onChange={handleUploadedFiles} />
                            </Button>
                        </div>
                    )}
                    <div>
                        <div style={{ marginBottom: '1rem' }}>
                            <TextField
                                value={values.description}
                                onChange={handleChange('description')}
                                id='outlined-basic'
                                label='Description'
                                variant='outlined'
                                multiline
                                rows={3}
                                classes={{ root: 'mobileLargeContainerSizing' }}
                                required
                            />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <TextField
                                classes={{ root: 'mobileLargeContainerSizing' }}
                                value={values.workoutType}
                                label='Workout Type'
                                onChange={handleChange('workoutType')}
                                select
                                required>
                                <MenuItem value={'chest'}>Chest</MenuItem>
                                <MenuItem value={'back'}>Back</MenuItem>
                                <MenuItem value={'biceps'}>Biceps</MenuItem>
                                <MenuItem value={'triceps'}>Triceps</MenuItem>
                                <MenuItem value={'shoulders'}>Shoulders</MenuItem>
                                <MenuItem value={'quads'}>Quads</MenuItem>
                                <MenuItem value={'hamstrings'}>Hamstrings</MenuItem>
                                <MenuItem value={'calfs'}>Calfs</MenuItem>
                                <MenuItem value={'glutes'}>Glutes</MenuItem>
                            </TextField>
                        </div>
                        <div className='reps-and-set-container' style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ marginRight: '0.25rem' }}>
                                    <TextField classes={{ root: 'mobileContainerSizing' }} value={values.reps} label='Reps' onChange={handleChange('reps')} select required>
                                        <MenuItem value={'1'}>1</MenuItem>
                                        <MenuItem value={'2'}>2</MenuItem>
                                        <MenuItem value={'3'}>3</MenuItem>
                                        <MenuItem value={'4'}>4</MenuItem>
                                        <MenuItem value={'5'}>5</MenuItem>
                                        <MenuItem value={'6'}>6</MenuItem>
                                        <MenuItem value={'7'}>7</MenuItem>
                                        <MenuItem value={'8'}>8</MenuItem>
                                        <MenuItem value={'9'}>9</MenuItem>
                                        <MenuItem value={'10'}>10</MenuItem>
                                    </TextField>
                                </div>
                                <Tooltip title='A rep is the number of times you perform a specific exercise'>
                                    <Help style={{ color: 'var(--button-blue)' }} />
                                </Tooltip>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ marginRight: '0.25rem' }}>
                                    <TextField classes={{ root: 'mobileContainerSizing' }} value={values.sets} label='Sets' onChange={handleChange('sets')} select required>
                                        <MenuItem value={'1'}>1</MenuItem>
                                        <MenuItem value={'2'}>2</MenuItem>
                                        <MenuItem value={'3'}>3</MenuItem>
                                        <MenuItem value={'4'}>4</MenuItem>
                                        <MenuItem value={'5'}>5</MenuItem>
                                        <MenuItem value={'6'}>6</MenuItem>
                                        <MenuItem value={'7'}>7</MenuItem>
                                        <MenuItem value={'8'}>8</MenuItem>
                                        <MenuItem value={'9'}>9</MenuItem>
                                        <MenuItem value={'10'}>10</MenuItem>
                                    </TextField>
                                </div>
                                <Tooltip title='A set is the number of cycles of reps that you complete'>
                                    <Help style={{ color: 'var(--button-blue)' }} />
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='generate-workouts-button'>
                    <Button
                        disabled={validPost ? false : true}
                        onClick={handlePostClick}
                        style={{
                            textTransform: 'none',
                            borderRadius: '500px',
                            padding: '0.5rem 2rem',
                            backgroundColor: validPost ? 'green' : 'gainsboro',
                            color: 'whitesmoke',
                            fontFamily: 'Spartan-B',
                            fontSize: '1rem',
                        }}
                        variant='contained'>
                        Post
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NewPost;
