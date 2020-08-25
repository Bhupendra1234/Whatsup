import React ,{useState,useEffect} from 'react';
import './Chat.css'
import{ Avatar,IconButton} from '@material-ui/core';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import MoreVert from '@material-ui/icons/MoreVert'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import Attachfile from '@material-ui/icons/AttachFile'
import MicIcon from '@material-ui/icons/Mic';
import db from './firebase'
import {useParams} from 'react-router-dom';
import {useStateValue} from './StateProvider';
import firebase from 'firebase';
const Chat =()=>{

    const [input,setinput] = useState('');
    const [seed , Setseed] = useState('');
    const {roomId} = useParams();
    const [roomname,setroomname] = useState('');
    const [messages,setmessage] =useState([]);
    const [{user},dispatch] =useStateValue('');

    useEffect(()=>{
        if(roomId)
        {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot=>(
                setroomname(snapshot.data().name)
            ))
                
            db.collection("rooms").doc(roomId).collection("message").orderBy("time","asc").onSnapshot
            (Snapshot=>(
                setmessage(Snapshot.docs.map((doc)=>doc.data() ) ) ) )
        }
    },[roomId])

    useEffect(()=>{
        Setseed(Math.floor(Math.random()*5000));
    },[])


    const sendmessage=(e)=>
    {
         e.preventDefault();
         console.log("You Typed->  ", input)
         db.collection('rooms').doc(roomId).collection('message').add({message:input,
            name:user.displayName,
        time:firebase.firestore.FieldValue.serverTimestamp(),})
         setinput("");

    }
      return (
          <div className="chat">
           <div className="chat__header">
                <Avatar src={`http://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div  className="chat__headerInfo">
                    <h3>{roomname}</h3>
                    <p>{new Date(messages[messages.length-1]?.time?.toDate()).toUTCString()}</p>
                </div>
         <div className="chat__headerRight">
                <IconButton>
                <SearchOutlined/>
                </IconButton>
                <IconButton>
                <Attachfile/>
                </IconButton>
                <IconButton>
                    <MoreVert/>
                </IconButton>
         </div>

             </div>
             <div className="chat__body">
                 {messages.map((message)=>(
                    <p className={`chat__message ${message.name===user.displayName && `chat__receiver`}`}><span className="chat__name">{message.name}
                    </span> <span className="size"> {message.message}</span>
                    <span className="chat__time">{new Date(message.time?.toDate()).toUTCString()}</span>
                    </p>  
                 ))}
                
             </div>
             <div className="chat__footer">
                <InsertEmoticonIcon/>
                <form>
                    <input type="text"  value={input}  placeholder="Type a message" onChange={e=>setinput(e.target.value)}/>
                    <button type="submit" onClick={sendmessage}>Send a message</button>
                </form>
                <MicIcon/>
             </div>
          </div>
      )
}
export default Chat;