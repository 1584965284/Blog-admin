import request from './request'

function LoginApi(params)
{
     return  request({
        method: 'get',
        url: 'users/login',
        headers: {
            "Content-Type": "application/json"
        },
        params: params
    })
}

export {
    LoginApi
} ;
