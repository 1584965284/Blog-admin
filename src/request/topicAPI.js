import request from './request'

function getall(params)
{
    return  request({
        method: 'get',
        url: 'topics/getall',
        headers: {
            "Content-Type": "application/json"
        },
    })
}

const check_my_post =(params)=>{
    return  request({
        method: 'post',
        url: 'mposts/check_my_post',
        headers: {
            "Content-Type": "application/json",

        },
        params:params
    })
}

const get_by_mid =(params)=>{
    return  request({
        method: 'get',
        url: 'fposts/get_by_mid',
        headers: {
            "Content-Type": "application/json",
        },
        params:params,
    })
}
const get_by_tid =(params)=>{
    return  request({
        method: 'get',
        url: 'mposts/get_by_tid',
        headers: {
            "Content-Type": "application/json",
        },
        params:params,
    })
}
const change_password = (params)=>{
    return  request({
        method: 'get',
        url: 'admins/change_password',
        headers: {
            "Content-Type": "application/json",
        },
        params:params,
    })
}

const reg = (params)=>{
    return  request({
        method: 'get',
        url: 'users/reg',
        headers: {
            "Content-Type": "application/json",
        },
        params:params,
    })
}
const change_avatar = (params)=>{
    return  request({
        method: 'post',
        url: 'users/change_avatar',
        headers: {
            "Content-Type": "application/json",
        },
        data:params,
    })
}

const get_by_title=(params)=>{
    return  request({
        method: 'post',
        url: 'mposts/get_by_title',
        headers: {
            "Content-Type": "application/json",
        },
        params:params,
        
        
    })
    
}
const get_by_uid=(params)=>{
    
    return  request({
        method: 'post',
        url: 'users/get_by_uid',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            
        },
        params:params
        
        
    })
}
const change_info=(params)=>{
    
    return  request({
        method: 'post',
        url: 'users/change_info',
        headers: {
            "Content-Type": "application/json",
            
        },
        params:params
        
        
    })
}
const get_by_uid2=(params)=>{
    
    return  request({
        method: 'post',
        url: 'mposts/get_by_uid',
        headers: {
            "Content-Type": "application/json",
            
        },
        params:params
        
        
    })
}
const mlike=(params)=>{
    
    return  request({
        method: 'post',
        url: 'mposts/add_like',
        headers: {
            "Content-Type": "application/json",
            
        },
        params:params
        
        
    })
}
const flike=(params)=>{
    
    return  request({
        method: 'post',
        url: 'fposts/add_like',
        headers: {
            "Content-Type": "application/json",
            
        },
        params:params
        
        
    })
}

const new_mpost=(params)=>{

    return  request({
        method: 'post',
        url: 'mposts/new_mpost',
        headers: {
            "Content-Type": "application/json",

        },
        params:params


    })
}
const new_fpost=(params)=>{

    return  request({
        method: 'post',
        url: 'fposts/new_fpost',
        headers: {
            "Content-Type": "application/json",

        },
        params:params


    })
}
const getM=(params)=>{

    return  request({
        method: 'post',
        url: 'mposts/get_by_mid',
        headers: {
            "Content-Type": "application/json",

        },
        params:params


    })
}
const del_mpost=(params)=>{

    return  request({
        method: 'post',
        url: 'mposts/del_mpost',
        headers: {
            "Content-Type": "application/json",

        },
        params:params


    })
}
const del_fpost=(params)=>{

    return  request({
        method: 'post',
        url: 'fposts/del_fpost',
        headers: {

        },
        params:params


    })
}
const get_by_day=(params)=>{

    return  request({
        method: 'post',
        url: 'mposts/get_by_day',
        headers: {
            "Content-Type": "application/json",

        },
        params:params


    })
}
const getPost=(params)=>{

    return  request({
        method: 'post',
        url: 'mposts/get_by_uid',
        headers: {
            "Content-Type": "application/json",

        },
        params:params


    })
}

const admin_login=(params)=>{

    return  request({
        method: 'post',
        url: 'admins/login',
        headers: {
            "Content-Type": "application/json",

        },
        params:params


    })
}
const getAllFPost=()=>{

    return  request({
        method: 'post',
        url: 'fposts/get_all',
        headers: {
            "Content-Type": "application/json",

        },
    })
}
const new_topic=(params)=>{

    return  request({
        method: 'post',
        url: 'topics/new_topic',
        headers: {
            "Content-Type": "application/json",

        },
        params:params


    })
}
const edit_topic=(params)=>{

    return  request({
        method: 'post',
        url: 'topics/edit_topic',
        headers: {
            "Content-Type": "application/json",

        },
        params:params


    })
}
const del_topic=(params)=>{

    return  request({
        method: 'post',
        url: 'topics/del_topic',
        headers: {
            "Content-Type": "application/json",

        },
        params:params


    })
}
const getAllMPost=()=>{

    return  request({
        method: 'post',
        url: 'mposts/get_all',
        headers: {
            "Content-Type": "application/json",
        },
    })
}


export {
    getall,check_my_post,get_by_mid,get_by_tid,change_password,reg,change_avatar,new_fpost,
    get_by_title,get_by_uid,change_info,get_by_uid2,mlike,flike,new_mpost,getM,
    del_mpost,del_fpost,get_by_day,getPost,
    admin_login,getAllFPost,new_topic,edit_topic,del_topic,getAllMPost
} ;
