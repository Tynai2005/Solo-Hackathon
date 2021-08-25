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
                createdAt: new Date().toString().slice(0,21),
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
                <div style={{width: '80%',height:'auto',minHeight: '400px',border: '4px solid #ce1e1e',borderRadius:'10px'}}>
                    {messages?.length > 0 ? messages.map((m) => (
                        <div>
                            <Grid container className={m.email == currentUser.email ? 'cur-user' : 'user'}>
                                <div className='message-cont'>
                                    <div className='date-email'>
                                        <div>
                                            <img className='ava' src="https://icon-library.com/images/person-icon-red/person-icon-red-14.jpg" alt="" />
                                        </div>
                                        <div className='info'>
                                            <div className='email' >{m.email}</div>
                                            <div className='date'>{m.createdAt.toString()}</div>
                                        </div>
                                    </div>
                                    <div className='comment'>{m.text}</div>
                                </div>
                            </Grid>
                        </div>
                    )): null}
                </div>
                <Grid container direction='column' alignItems='flex-end' style={{width: '80%',marginTop: '10px'}}>
                    <TextField error value={value} label='Write comment here' onChange={(e) => setValue(e.target.value)} variant='outlined'/>
                    <Button style={{backgroundColor:'green',margin:'10px 0'}} onClick={sendMessage}>Send</Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Chat;