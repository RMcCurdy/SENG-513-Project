import React, { useContext, useState } from 'react';
import AppContext from '../../context/AppContext';
import ProfilePosts from './ProfilePosts';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Profile = () => {
    const { user } = useContext(AppContext);

    const [editProfile, setEditProfile] = useState(false);
    const [editUsername, setEditUsername] = useState(user.username);
    const [editPassword, setEditPassword] = useState(user.password);
    const [editConfirmPassword, setEditConfirmPassword] = useState('');

    const initialProfileVals = {
        username: user.username,
        password: user.password,
    };

    // TODO Get all the posts from the DB for the current user
    const data = [
        {
            id: 1,
            username: 'johnsmith123',
            image: 'https://cdn.lifehack.org/wp-content/uploads/2018/03/workout-routines-for-men-1024x768.jpeg',
            date: '2022-03-13 12:45pm',
            description: 'This is me working out!',
            comments: [
                {
                    username: 'maryjane123',
                    comment: 'Wow nice job!',
                },
                {
                    username: 'dougjones123',
                    comment: 'Very cool!',
                },
                {
                    username: 'dougjones123',
                    comment: 'Very nice!',
                },
            ],
        },
        {
            id: 2,
            username: 'dougjones123',
            image: 'https://manofmany.com/wp-content/uploads/2020/05/7-minute-workout.jpg',
            date: '2022-03-13 12:30pm',
            description: 'This is me running!',
            comments: [
                {
                    username: 'maryjane123',
                    comment: 'Wow nice job!',
                },
                {
                    username: 'dougjones123',
                    comment: 'Very cool!',
                },
            ],
        },
        {
            id: 3,
            username: 'dougjones123',
            image: 'https://manofmany.com/wp-content/uploads/2020/05/7-minute-workout.jpg',
            date: '2022-03-13 12:30pm',
            description: 'This is me running!',
            comments: [
                {
                    username: 'maryjane123',
                    comment: 'Wow nice job!',
                },
                {
                    username: 'dougjones123',
                    comment: 'Very cool!',
                },
            ],
        },
        {
            id: 4,
            username: 'dougjones123',
            image: 'https://manofmany.com/wp-content/uploads/2020/05/7-minute-workout.jpg',
            date: '2022-03-13 12:30pm',
            description: 'This is me running!',
            comments: [
                {
                    username: 'maryjane123',
                    comment: 'Wow nice job!',
                },
                {
                    username: 'dougjones123',
                    comment: 'Very cool!',
                },
            ],
        },
        {
            id: 5,
            username: 'dougjones123',
            image: 'https://manofmany.com/wp-content/uploads/2020/05/7-minute-workout.jpg',
            date: '2022-03-13 12:30pm',
            description: 'This is me running!',
            comments: [
                {
                    username: 'maryjane123',
                    comment: 'Wow nice job!',
                },
                {
                    username: 'dougjones123',
                    comment: 'Very cool!',
                },
            ],
        },
    ];

    const handleEditProfileClick = () => {
        setEditProfile(!editProfile);
    };

    return (
        <div className='profile-container'>
            <div className='card-container'>
                {editProfile ? (
                    <>
                        <div className='editprofile-header'>Edit Profile</div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img
                                className='profile-avatar-image'
                                src='https://thumbs.dreamstime.com/b/profile-icon-male-avatar-portrait-casual-person-silhouette-face-flat-design-vector-46846325.jpg'
                                alt='avatar'
                            />
                            <div className='editprofile-profile-pic-header'>Change profile picture</div>

                            <TextField
                                style={{ marginTop: '1rem' }}
                                id='standard-basic'
                                label='Username'
                                variant='standard'
                                value={editUsername}
                                onChange={(e) => setEditUsername(e.target.value)}
                            />
                            <TextField
                                style={{ marginTop: '1rem' }}
                                id='standard-basic'
                                label='Password'
                                variant='standard'
                                value={editPassword}
                                onChange={(e) => setEditPassword(e.target.value)}
                            />

                            <Button
                                onClick={handleEditProfileClick}
                                style={{
                                    textTransform: 'none',
                                    borderRadius: '500px',
                                    padding: '0.5rem 1.5rem',
                                    backgroundColor: '#0077b6',
                                    color: 'white',
                                    fontFamily: 'Spartan-B',
                                    fontSize: '1rem',
                                    marginTop: '2rem',
                                }}
                                variant='contained'>
                                Back
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='upper-card-container'>
                            <img
                                className='profile-avatar-image'
                                src='https://thumbs.dreamstime.com/b/profile-icon-male-avatar-portrait-casual-person-silhouette-face-flat-design-vector-46846325.jpg'
                                alt='avatar'
                            />
                            <div className='profile-header'>{user.username}</div>
                            <div className='profile-edit-button'>
                                <Button
                                    onClick={handleEditProfileClick}
                                    style={{
                                        textTransform: 'none',
                                        borderRadius: '500px',
                                        padding: '0.5rem 1rem',
                                        backgroundColor: '#f4f4f4',
                                        color: 'black',
                                        fontFamily: 'Spartan-B',
                                        fontSize: '1rem',
                                    }}
                                    variant='contained'>
                                    Edit Profile
                                </Button>
                            </div>
                        </div>
                        <hr style={{ width: '100%', margin: '2rem 0' }} />
                        <div className='profile-posts-container'>
                            {data.map((post) => {
                                return <ProfilePosts key={post.id} image={post.image} />;
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;
