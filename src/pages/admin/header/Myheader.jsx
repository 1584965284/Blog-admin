import React,{ useEffect, useState}   from 'react'
import { Layout, Menu, Breadcrumb, message } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import {useHistory,Route,Switch} from 'react-router-dom'
import Avatar from 'antd/lib/avatar/avatar';
const { Header, Content, Sider } = Layout;

 
const headerNavPage=['posts','MyPage']
const headerNavInfo=['主页','我的','退出登录'];
const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: headerNavInfo[key-1],
  
}));
const user={}

export default function MyHeader(){
  const history =useHistory()
        const handleClick=e=>{
            console.log(e);
            // if(e.key==="2"){
            //    history.push('/forum/MyPage');
            //     //window.location.replace('/forum/MyPage')
            //    //window.location.reload()
            // }
             if(e.key<3){
              history.push('/forum/'+headerNavPage[e.key-1])
            }
            else{
              message.success('已安全退出')
              localStorage.clear();
              setTimeout(() => {
                history.push('/master')
              }, 200);
              
            }
        }
    useEffect(()=>{

    },[])
  return(
    <div>
    <Header className="header">
    
      <span className='rightName'></span>
      <Menu onClick={handleClick} theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={items1} />
      
    </Header>
    </div>
    
  )
}
