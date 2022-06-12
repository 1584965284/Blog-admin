import React,{Component}  from 'react'
import 'moment/locale/zh-cn'
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Checkbox,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './css/login.less'
import { LoginApi } from '../../request/api';
import {getall,admin_login} from "@/request/topicAPI";

import axios from 'axios';
import moment from 'moment'
moment.locale('zh-cn');  

export default function Login (){
     
       const history=useHistory()
      const onFinish=(value)=>{
        console.log(value)
         admin_login({Adminname:value.username,password:value.password}).then(res=>{
        
        if(res.state===200){
          message.success('登录成功')
          localStorage.setItem('token',res.data.aid)
           localStorage.setItem('name',res.data.adminName)
          // localStorage.setItem('lastLoginTime',moment(new Date()))
          
          setTimeout(() => {
            history.push('/forum')
          }, 200);
        }else{
          message.error('登录失败')
        }
      })

      };

        return(
        <div className='login'>
            <header>
                <h1>BBS后台管理系统</h1>
            </header>

            <section>
                <h1>管理员登录</h1>
                <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      

      <Form.Item>
        <Button size='large' type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
       
      </Form.Item>
    </Form>

            </section>

        </div>
        )
    
}

