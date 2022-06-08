import React,{Component} from 'react'
import "antd/dist/antd.css"
import 'moment/locale/zh-cn'
import {Route,Switch,useHistory } from 'react-router-dom'
import { Button,message } from 'antd'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'

import moment from 'moment';
moment.locale('zh-cn');  




export default function App (){
        const history=useHistory();
        let a=moment(new Date());
        let b=localStorage.getItem('lastLoginTime')
        if(!localStorage.getItem('token')){history.push('/login')}
        else{
            if(a.diff(b,"hour")>2){
                history.push('/login')
            }else{
                history.push('/admin')
            }
        }
        
        return (
            
            <div className='app'><Switch>
                <Route path='/login' component={Login}/>
                <Route path='/admin' component={Admin}/>
            </Switch></div>
            
        )
    }



