import Bench from '../images/bench.png';
import Curl from '../images/curl.png';
import Run from '../images/run.png';
import Rope from '../images/rope.png';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from '../firebase';
import { red } from '@material-ui/core/colors';

const LandingPage = () => {
    const history = useHistory();
    const images = [Bench, Curl, Rope, Run];

    const [users, setUsers] = useState([]);

    const handleStartSharingClick = () => {
        history.push('/signin');
    };

    const ref = firebase.firestore().collection("users"); 

    //Gets live updates from the database ("better way")
    function getUsers(){
        ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setUsers(items);
        })
    }

    //one time get request (needs page reload for update of data)
    function getUsers2(){
        ref.get().then((item) => {
            const items = item.docs.map((doc) => doc.data());
            setUsers(items);
        })
    }

    useEffect(() => {
        // getUsers();
        getUsers2();
    }, []);

    console.log(users);

    return (
        <div className='landing-page-container'>
            <div>
                <div className='landing-page-header'>Workout and start sharing daily!</div>
                <div className='landing-page-subheader'>Get daily workout goals and compare your results against others.</div>
                <button onClick={handleStartSharingClick} className='landing-page-button'>
                    START SHARING NOW
                </button>
            </div>
            <img className='landing-page-image fade-in' src={images[0]} alt='workout' />
        </div>
    );
};

export default LandingPage;
