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

export {
    getall,check_my_post,get_by_mid,get_by_tid
} ;
