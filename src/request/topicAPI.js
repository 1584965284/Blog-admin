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

const check_my_post =()=>{
    return  request({
        method: 'post',
        url: 'topics/getall',
        headers: {
            "Content-Type": "application/json",

        },
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
        url: 'users/change_password',
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
const new_fpost = (post,fileList)=>{
    return  request({
        method: 'post',
        url: 'fposts/new_fpost',
        headers: {
            "Content-Type": "application/json",
        },
        params:{post:post},
        data:{img:fileList}
        
    })
}


export {
    getall,check_my_post,get_by_mid,get_by_tid,change_password,reg,change_avatar,new_fpost
} ;
