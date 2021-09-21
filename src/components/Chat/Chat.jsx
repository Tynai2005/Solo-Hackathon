import React from 'react';
import { useContext } from 'react';
import { Avatar, Button, Container, Grid, TextField } from '@material-ui/core';
import { useState } from 'react';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { AuthContext } from '../../contexts/AuthContext';
import './assets/Chat.css'

const Chat = () => {

    const {currentUser} = useContext(AuthContext)

    const [messages] = useCollectionData(firebase.firestore().collection('messages').orderBy('createdAt'))

    const [value,setValue] = useState('')
 
    const sendMessage = () => {
        if (value.trim().length != 0){
            firebase.firestore().collection('messages').add({
                email: currentUser.email,
                text: value,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            })
            setValue('')
        }else{
            alert("Comment cannot be empty")
        }
    }

    return (
        <Container>
            <Grid container style={{width: '100%',marginTop: '20px',display:'flex',flexDirection:'column',alignItems:'center'}} justify='center'>
            <h2 className='title'>De Moto Chat</h2>
                <div className='chat-container'>
                    {messages?.length > 0 ? messages.map((m) => (
                        <div>
                            <Grid container className={m.email == currentUser.email ? 'cur-user' : 'user'}>
                                <div className='message-cont'>
                                    <div className='date-email'>
                                        <div>
                                            <img className='ava' src="https://icon-library.com/images/person-icon-red/person-icon-red-14.jpg" alt="" />
                                        </div>
                                        <div className='info'>
                                            <div className='email'>{m.email}</div>
                                        </div>
                                    </div>
                                    <div className='comment'>{m.text}</div>
                                </div>
                            </Grid>
                        </div>
                    )): null}
                </div>
                <Grid container direction='column' alignItems='center' style={{width: '80%',marginTop: '10px'}}>
                    <TextField error value={value} label='Write message here' onChange={(e) => setValue(e.target.value)} variant='outlined'/>
                    <Button className='sendMessageToChat' onClick={sendMessage}>Send</Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Chat;