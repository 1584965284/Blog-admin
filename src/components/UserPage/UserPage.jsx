import React,{ useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {
    Form,
    Input,
    Select,
    Checkbox, Avatar, Upload, message,Modal,
    Button, Tooltip,Image
} from 'antd';
import UserManage from '../UserManage/UserManage';

import {change_password,change_avatar,get_by_uid,change_info} from "@/request/topicAPI";

let user={};

export default function UserPage(props){
    const history =useHistory();

    useEffect(()=>{
        get_by_uid({uid:props.match.params.uid}).then(res=>{
            if(res.state===200){
                user=res.data
            }
        })
    },[])


    return(<div>


                <div style={{width:'200px',margin:"0 auto"}}>
                   <Avatar size={64} src={"http://localhost:8080/upload/"+user.profile} />
                   <div style={{fontSize:"18px",fontWeight:"bold" ,position:"relative",left:"5px"}}>{user.userName}</div>
               </div>
               <div>
                   
               </div>
    </div>)
}