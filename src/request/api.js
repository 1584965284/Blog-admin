import request from './request'

export const LoginApi=(params)=>request.post('/api/master/adminLogin',params)

export const NFTApi=(params)=>request.get('/api/master/getNFTInfo',{params})