import React, { useState, useEffect } from 'react';
import{ Avatar} from '@material-ui/core';
import  './sidebarchat.css'
import db from './firebase';
import {Link} from 'react-router-dom';
const Sidebarchat =({id,name,addnewChat})=>{

    const [seed , Setseed] = useState('');
    const [messages,setmessages] =useState("");
    useEffect(()=>{
        Setseed(Math.floor(Math.random()*5000));
    },[])

    useEffect(()=>{
        if(id)
        {
            db.collection("rooms").doc(id).collection("message").orderBy("time","desc").onSnapshot
            (Snapshot=>(
                setmessages(Snapshot.docs.map((doc)=>doc.data() ) ) ) )
        }
    },[id])
     const createChat =()=>{
         const roomname = prompt("Please Enter name for chat")
         if(roomname)
         {
                db.collection("rooms").add({
                    name:roomname,
                })
         }
     }

    return  !addnewChat  ? (
     <Link to={`/rooms/${id}`}>
        <div className="sidebarchat">
        <Avatar src={`http://avatars.dicebear.com/api/human/${seed}.svg`}/>
        <div className="SidebarCharinfo">
            <h2>{name}</h2>
             <p>{messages[0]?.message}</p>
        </div>
        </div>
        </Link>)
        :(
           <div onClick={createChat} className="sidebarchat">
                <h2>Add new Chat</h2>
        </div>
    )
}
export default Sidebarchat;