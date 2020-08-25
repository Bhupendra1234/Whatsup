import React, { useState, useEffect } from 'react';
import "./Sidebar.css"
import{ Avatar, IconButton} from '@material-ui/core';
import  DountLarge from '@material-ui/icons/DonutLarge'
import MoreVert from '@material-ui/icons/MoreVert'
import Chat from '@material-ui/icons/Chat'
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import SidebarChat from './Sidebarchat';
import Sidebarchat from './Sidebarchat';
import db from './firebase';

const Sidebar =()=>{

    const [rooms,setroom] =useState([]);
    useEffect(()=>{
    const unsubcribe =   db.collection("rooms").onSnapshot((onSnapshot)=>
        setroom(onSnapshot.docs.map((doc)=>({
            id:doc.id,
            data:doc.data(),
        }))))
    return ()=>{
        unsubcribe();
    }
    },[])
    return (
        <div className="sidebar">
         <div className="sidebar__header">
            <Avatar/>
         <div className="sidebar__headerright">
             <IconButton>
          <DountLarge/>
          </IconButton>
          <IconButton>
          <Chat/>
          </IconButton>
          <IconButton>
          <MoreVert/>
          </IconButton>
         </div>
         </div>
         <div className="sidebar__search">
            <div className="Sidebar_searchContainer">
           <SearchOutlined/>
           <input placeholder="Search or start new chat" type="text" />
           </div>
         </div>
         <div className="sidebar__chats">
          <SidebarChat addnewChat/>
         {
             rooms.map((room)=>
             (
                <Sidebarchat key={room.id} id={room.id} name={room.data.name} />
             ))
         }
              
         </div>
        </div>
    )
}
export default Sidebar;