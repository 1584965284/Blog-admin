import React, {Component, useState} from 'react'
import 'moment/locale/zh-cn'
import { useHistory } from 'react-router-dom';
import {
    AutoComplete,
    Cascader,
    Col,
    InputNumber,
    Row,
    Select,
} from 'antd';
import { Form, Input, Button, Checkbox,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.less'
//import { LoginApi } from '../../request/api';
import axios from 'axios';
import moment from 'moment'
//import Register from "../../../components/Register/Register";
moment.locale('zh-cn');


export default function Login (){
    const { Option } = Select;

    const history=useHistory();
    const [isLogin,setIsLogin] = useState(true);
    const onFinish=(value)=>{
        axios({
            method: 'post',
            url: 'http://114.55.119.223/prod-api/api/master/adminLogin',
            headers: {
                "Authorization": "APPCODE " + '77814df9'
            },
            data:{name:value.username,pwd:value.password}
        }).then(res=>{

            if(res.data.errCode===0){
                message.success('登录成功')
                localStorage.setItem('token',res.data.data.token)
                localStorage.setItem('name',res.data.data.name)
                localStorage.setItem('lastLoginTime',moment(new Date()))

                setTimeout(() => {
                    history.push('/admin')
                }, 200);
            }else{
                message.error('登录失败')
            }
        })

    };

    return(
        <div className='login'>
            <header>
                <h1>BBS论坛</h1>
            </header>

            <section>

                <div>
                    {
                        isLogin ? (
                            <div>
                                <h1>登录</h1>
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
                                            登录
                                        </Button>
                                        <Button size='large' type="primary"  className="login-form-button" onClick={()=>{setIsLogin(false)}} style={{marginLeft: '20px'}}>
                                            去注册
                                        </Button>

                                    </Form.Item>
                                </Form>
                            </div>

                        ):(
                            <div>
                                <h1>注册</h1>
                                <Form
                                    name="register"
                                    onFinish={onFinish}
                                    scrollToFirstError
                                >
                                    <Form.Item
                                        name="email"
                                        label="邮箱"
                                        rules={[
                                            {
                                                type: 'email',
                                                message: 'The input is not valid E-mail!',
                                            },
                                            {
                                                required: true,
                                                message: 'Please input your E-mail!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        name="password"
                                        label="密码"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your password!',
                                            },
                                        ]}
                                        hasFeedback
                                    >
                                        <Input.Password />
                                    </Form.Item>

                                    <Form.Item
                                        name="confirm"
                                        label="确认密码"
                                        dependencies={['password']}
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please confirm your password!',
                                            },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('password') === value) {
                                                        return Promise.resolve();
                                                    }

                                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input.Password />
                                    </Form.Item>

                                    <Form.Item
                                        name="nickname"
                                        label="昵称"
                                        tooltip="What do you want others to call you?"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your nickname!',
                                                whitespace: true,
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>


                                    <Form.Item>
                                        <Button size='large' type="primary" htmlType="submit" className="login-form-button">
                                            注册
                                        </Button>
                                        <Button size='large' type="primary"  className="login-form-button" onClick={()=>{setIsLogin(true)}} style={{marginLeft: '20px'}}>
                                            去登录
                                        </Button>

                                    </Form.Item>
                                </Form>
                            </div>
                        )

                    }
                        </div>


            </section>

        </div>
    )

}

