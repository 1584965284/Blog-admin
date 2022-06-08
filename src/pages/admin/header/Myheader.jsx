import React,{Component}  from 'react'
import { Layout, Menu, Breadcrumb, message } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import {useHistory,Route,Switch} from 'react-router-dom'
const { Header, Content, Sider } = Layout;

 
const headerNavPage=['audit','MyPage']
const headerNavInfo=['主页','我的','退出登录'];
const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: headerNavInfo[key-1],
  
}));

export default function MyHeader(){
  const history =useHistory()
        const handleClick=e=>{
            if(e.key<3){
              history.push('/admin/'+headerNavPage[e.key-1])
            }
            else{
              message.success('已安全退出')
              localStorage.clear();
              setTimeout(() => {
                history.push('/login')
              }, 200);
              
            }
        }

  return(
    <div>
    <Header className="header">
      <span className='rightName'>{localStorage.getItem('name')}</span>
      <Menu onClick={handleClick} theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={items1} />
      
    </Header>
    </div>
    
  )
}
